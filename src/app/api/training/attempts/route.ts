import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export async function POST(request: NextRequest) {
  try {
    const { quizId, answers } = await request.json()
    if (!quizId || !Array.isArray(answers)) return NextResponse.json({ error: 'quizId and answers required' }, { status: 400 })

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Fetch quiz with questions to score
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('id, passing_score, is_final, quiz_questions(id, points, correct_answer)')
      .eq('id', quizId)
      .single()
    if (quizError || !quiz) return NextResponse.json({ error: quizError?.message || 'Quiz not found' }, { status: 404 })

    // Score
    let score = 0
    const byQuestion: Record<string, any> = {}
    for (const q of quiz.quiz_questions || []) {
      const userAns = answers.find((a: any) => a.questionId === q.id)
      const correct = JSON.stringify((userAns?.answer ?? []).sort()) === JSON.stringify((q.correct_answer ?? []).sort())
      if (correct) score += q.points || 0
      byQuestion[q.id] = { correct, points: q.points || 0, awarded: correct ? (q.points || 0) : 0 }
    }
    const totalPoints = (quiz.quiz_questions || []).reduce((acc: number, q: any) => acc + (q.points || 0), 0)
    const percent = totalPoints ? Math.round((score / totalPoints) * 100) : 0
    const passed = percent >= (quiz.passing_score ?? 80)

    // Save attempt
    const { data: attempt, error: insertError } = await supabase
      .from('quiz_attempts')
      .insert([{ user_id: user.id, quiz_id: quizId, score: percent, passed, answers }])
      .select('*')
      .single()
    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 400 })

    return NextResponse.json({ attempt, summary: { scorePercent: percent, passed, totalPoints, perQuestion: byQuestion } })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
  }
}


