import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export async function POST(request: NextRequest) {
  try {
    const { courseName, score, pdfDataUrl } = await request.json()
    if (!courseName || typeof score !== 'number') return NextResponse.json({ error: 'courseName and score required' }, { status: 400 })

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('certificates')
      .insert([{ user_id: user.id, course_name: courseName, score, pdf_data_url: pdfDataUrl ?? null }])
      .select('*')
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ certificate: data })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', user.id)
      .order('issued_at', { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ certificates: data || [] })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
  }
}


