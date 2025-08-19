'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { BookOpen, Clock, CheckCircle, Shield, Flag, Video, Award, Download, X, Play } from 'lucide-react'
import CyberBackground from '@/components/ui/CyberBackground'
import { GlassCard } from '@/components/ui/GlassCard'
import { CyberButton } from '@/components/ui/cyber-button'
import { Progress } from '@/components/ui/Progress'
import { useAuth } from '@/hooks/useAuth'
import Layout, { PageContainer } from '@/components/layout/Layout'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { motion, AnimatePresence } from 'framer-motion'
import { jsPDF } from 'jspdf'
import { generateCertificate } from '@/lib/certificate'

type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
type Category = 'PHISHING' | 'PASSWORD_SECURITY' | 'SOCIAL_ENGINEERING' | 'DATA_PROTECTION' | 'SAFE_BROWSING' | 'INCIDENT_RESPONSE'

type LessonType = 'TEXT' | 'VIDEO' | 'INTERACTIVE_EMAIL' | 'DRAG_DROP' | 'TIPS'

interface LessonContent {
  type: LessonType
  title: string
  body?: string
  videoUrl?: string
  interactive?: any
  tips?: string[]
}

interface ModuleRecord {
  id: string
  title: string
  description: string
  category: Category
  difficulty: Difficulty
  estimated_duration: number
  content: { lessons: LessonContent[] }
}

interface ProgressRecord {
  user_id: string
  module_id: string
  progress: number
  completed: boolean
  current_lesson: number
}

function makeDefaultModules(): ModuleRecord[] {
  const phishingEmailInteractive = {
    samples: [
      {
        sender: 'IT Support <no-reply@c0mpany.com>',
        subject: 'URGENT: Password Expiring Today',
        body: 'Your password expires in 24 hours. Update now to avoid lockout.',
        cues: ['Misspelled domain', 'Urgent tone', 'Generic greeting'],
        isPhish: true,
      },
      {
        sender: 'Security Team <alerts@company.com>',
        subject: 'New security policy update',
        body: 'Please review the new MFA policy in the portal.',
        cues: ['Legit domain', 'No pressure'],
        isPhish: false,
      },
    ],
  }

  const dragDropInteractive = {
    items: [
      { id: '1', text: 'hr-payroll-secure.com', label: 'Phishing' },
      { id: '2', text: 'hr.company.com', label: 'Safe' },
      { id: '3', text: 'drive-storage-help.net', label: 'Phishing' },
      { id: '4', text: 'portal.company.com', label: 'Safe' },
    ],
    buckets: ['Safe', 'Phishing'],
  }

  const build = (id: string, title: string, category: Category, difficulty: Difficulty, minutes: number): ModuleRecord => ({
    id,
    title,
    description: 'Interactive module with real-world scenarios, tips, and an assessment.',
    category,
    difficulty,
    estimated_duration: minutes,
    content: {
      lessons: [
        { type: 'TEXT', title: 'Overview', body: 'Learn to identify and respond to common threats with hands-on practice.' },
        { type: 'VIDEO', title: 'Quick explainer', videoUrl: 'https://player.vimeo.com/video/76979871' },
        { type: 'INTERACTIVE_EMAIL', title: 'Spot the red flags', interactive: phishingEmailInteractive },
        { type: 'DRAG_DROP', title: 'Safe vs Phishing', interactive: dragDropInteractive },
        { type: 'TIPS', title: 'Pro Tips', tips: [
          'Always verify sender domains',
          'Hover links before clicking',
          'Use MFA everywhere',
          'Report suspicious emails to security',
        ] },
      ],
    },
  })

  const mods: ModuleRecord[] = [
    build('m-phish-1', 'Phishing Awareness I', 'PHISHING', 'BEGINNER', 25),
    build('m-phish-2', 'Phishing Awareness II', 'PHISHING', 'INTERMEDIATE', 35),
    build('m-se-1', 'Social Engineering Basics', 'SOCIAL_ENGINEERING', 'BEGINNER', 30),
    build('m-pass-1', 'Password Security Mastery', 'PASSWORD_SECURITY', 'BEGINNER', 20),
    build('m-safe-1', 'Safe Browsing Essentials', 'SAFE_BROWSING', 'BEGINNER', 20),
    build('m-data-1', 'Data Protection Fundamentals', 'DATA_PROTECTION', 'BEGINNER', 30),
    build('m-incident-1', 'Incident Response 101', 'INCIDENT_RESPONSE', 'INTERMEDIATE', 40),
  ]
  return mods
}

export default function TrainingPage() {
  const { user } = useAuth()
  const [modules, setModules] = useState<ModuleRecord[]>([])
  const [progressMap, setProgressMap] = useState<Record<string, ProgressRecord>>({})
  const [selectedCategory, setSelectedCategory] = useState<'all' | Category>('all')
  const [overallProgress, setOverallProgress] = useState(0)
  const [activeModule, setActiveModule] = useState<ModuleRecord | null>(null)
  const [activeLessonIdx, setActiveLessonIdx] = useState(0)
  const [showTour, setShowTour] = useState(false)
  const [quizMode, setQuizMode] = useState<'idle' | 'module' | 'final'>('idle')
  const [quizQuestions, setQuizQuestions] = useState<any[]>([])
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [scoring, setScoring] = useState<{ scorePercent: number; passed: boolean } | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/training/modules')
        const data = await res.json()
        const fetched = Array.isArray(data.modules) ? data.modules : []
        const normalized: ModuleRecord[] = fetched.map((m: any) => ({
          id: m.id,
          title: m.title,
          description: m.description,
          category: m.category,
          difficulty: m.difficulty,
          estimated_duration: m.estimated_duration,
          content: m.content,
        }))
        const fallbacks = normalized.length ? [] : makeDefaultModules()
        setModules(normalized.length ? normalized : fallbacks)
        const pm = data.progress || {}
        setProgressMap(pm)
      } catch {
        setModules(makeDefaultModules())
      }
    }
    load()
  }, [])

  useEffect(() => {
    const progresses = modules.map(m => (progressMap[m.id]?.progress ?? 0))
    const total = progresses.reduce((a, b) => a + b, 0)
    setOverallProgress(modules.length ? Math.round(total / modules.length) : 0)
  }, [modules, progressMap])

  const categories = useMemo(() => {
    const defs: Array<{ id: 'all' | Category; name: string; count: number }> = [
      { id: 'all', name: 'All Modules', count: modules.length },
      { id: 'PHISHING', name: 'Phishing Awareness', count: modules.filter(m => m.category === 'PHISHING').length },
      { id: 'PASSWORD_SECURITY', name: 'Password Security', count: modules.filter(m => m.category === 'PASSWORD_SECURITY').length },
      { id: 'SOCIAL_ENGINEERING', name: 'Social Engineering', count: modules.filter(m => m.category === 'SOCIAL_ENGINEERING').length },
      { id: 'SAFE_BROWSING', name: 'Safe Browsing', count: modules.filter(m => m.category === 'SAFE_BROWSING').length },
      { id: 'DATA_PROTECTION', name: 'Data Protection', count: modules.filter(m => m.category === 'DATA_PROTECTION').length },
      { id: 'INCIDENT_RESPONSE', name: 'Incident Response', count: modules.filter(m => m.category === 'INCIDENT_RESPONSE').length },
    ]
    return defs
  }, [modules])

  const filteredModules = selectedCategory === 'all' ? modules : modules.filter(m => m.category === selectedCategory)

  function progressOf(moduleId: string) {
    return progressMap[moduleId]?.progress ?? 0
  }

  async function saveProgress(moduleId: string, partial: Partial<ProgressRecord>) {
    setProgressMap(prev => ({ ...prev, [moduleId]: { ...(prev[moduleId] || {}), ...partial, module_id: moduleId } as any }))
    try {
      await fetch('/api/training/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, progress: partial.progress, completed: partial.completed, currentLesson: partial.current_lesson }),
      })
    } catch {}
  }

  function startModule(m: ModuleRecord) {
    setActiveModule(m)
    const current = progressMap[m.id]?.current_lesson ?? 0
    setActiveLessonIdx(current)
  }

  function nextLesson() {
    if (!activeModule) return
    const next = Math.min(activeLessonIdx + 1, (activeModule.content.lessons?.length ?? 1) - 1)
    setActiveLessonIdx(next)
    const fraction = Math.round(((next + 1) / (activeModule.content.lessons.length)) * 100)
    saveProgress(activeModule.id, { current_lesson: next, progress: fraction })
  }

  function prevLesson() {
    if (!activeModule) return
    const prev = Math.max(0, activeLessonIdx - 1)
    setActiveLessonIdx(prev)
    const fraction = Math.round(((prev + 1) / (activeModule.content.lessons.length)) * 100)
    saveProgress(activeModule.id, { current_lesson: prev, progress: fraction })
  }

  async function openModuleQuiz(final = false) {
    setQuizMode(final ? 'final' : 'module')
    setAnswers({})
    setScoring(null)
    try {
      const url = final ? '/api/training/quizzes?final=true' : `/api/training/quizzes${activeModule ? `?moduleId=${activeModule.id}` : ''}`
      const res = await fetch(url)
      const data = await res.json()
      const pick = (data.quizzes?.[0]?.quiz_questions || []).slice(0, 8)
      if (pick.length) setQuizQuestions(pick)
      else setQuizQuestions(defaultQuiz(final))
    } catch {
      setQuizQuestions(defaultQuiz(final))
    }
  }

  function defaultQuiz(final: boolean) {
    const q = [
      { id: 'q1', question: 'Which email address is most suspicious?', options: ['it-support@company.com', 'no-reply@companny.com', 'security@company.com'], correct_answer: ['no-reply@companny.com'], points: 2 },
      { id: 'q2', question: 'True or False: You should reuse strong passwords across sites.', options: ['True', 'False'], correct_answer: ['False'], points: 1 },
      { id: 'q3', question: 'Pick all safe actions when you suspect phishing.', options: ['Click the link to check', 'Report to security', 'Hover to inspect URL'], correct_answer: ['Report to security', 'Hover to inspect URL'], points: 2 },
    ]
    return final ? [...q, { id: 'q4', question: 'Which of these domains is safe?', options: ['portal-company-verify.com', 'portal.company.com'], correct_answer: ['portal.company.com'], points: 2 }] : q
  }

  async function submitQuiz() {
    try {
      const payloadAnswers = quizQuestions.map(q => ({ questionId: q.id, answer: answers[q.id] || [] }))
      const res = await fetch('/api/training/attempts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ quizId: quizQuestions[0]?.quiz_id || 'local', answers: payloadAnswers }) })
      const data = await res.json().catch(() => null)
      const scorePercent = data?.summary?.scorePercent ?? scoreLocal()
      const passed = data?.summary?.passed ?? (scorePercent >= 80)
      setScoring({ scorePercent, passed })
      if (activeModule && quizMode === 'module') {
        saveProgress(activeModule.id, { completed: true, progress: Math.max(90, progressOf(activeModule.id)) })
      }
    } catch {
      const scorePercent = scoreLocal()
      setScoring({ scorePercent, passed: scorePercent >= 80 })
    }
  }

  function scoreLocal() {
    let total = 0
    let got = 0
    for (const q of quizQuestions) {
      const correct = JSON.stringify((answers[q.id] || []).sort()) === JSON.stringify((q.correct_answer || []).sort())
      total += q.points || 1
      got += correct ? (q.points || 1) : 0
    }
    return total ? Math.round((got / total) * 100) : 0
  }

  async function issueCertificate() {
    if (!user) return
    const pdf = await generateCertificate({ userName: user.name || user.email, courseName: 'Cybersecurity Awareness Program', completionDate: new Date().toLocaleDateString(), score: scoring?.scorePercent || 0, totalQuestions: quizQuestions.length })
    try {
      await fetch('/api/training/certificates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ courseName: 'Cybersecurity Awareness Program', score: scoring?.scorePercent || 0, pdfDataUrl: pdf }) })
    } catch {}
    const link = document.createElement('a')
    link.href = pdf
    link.download = 'certificate.pdf'
    link.click()
  }

  function downloadChecklist() {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Phishing Detection Checklist', 14, 20)
    const tips = [
      'Verify sender domain (e.g., company.com vs companny.com)',
      'Hover links to inspect real destination URL',
      'Beware urgent tone or requests for credentials',
      'Report suspicious emails to security team',
      'Use MFA on all accounts',
    ]
    doc.setFontSize(12)
    tips.forEach((t, i) => doc.text(`- ${t}`, 14, 35 + i * 8))
    doc.save('phishing-checklist.pdf')
  }

  function GuidedTour() {
    if (!showTour) return null
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="bg-black/70 border border-cyber-purple/40 rounded-lg p-6 max-w-lg text-cyber-white">
          <h3 className="text-xl font-bold mb-2">Guided Tour</h3>
          <p className="text-cyber-white/80 mb-4">Explore interactive modules, complete quizzes, track progress, and earn a certificate. Try the drag-and-drop and email spotting exercises for hands-on learning.</p>
          <div className="flex justify-end gap-2">
            <CyberButton variant="secondary" onClick={() => setShowTour(false)}>
              Close
            </CyberButton>
          </div>
        </div>
      </div>
    )
  }

  function EmailInteractive({ data }: { data: any }) {
    const [selected, setSelected] = useState<number | null>(null)
    return (
      <div className="space-y-3">
        {data.samples.map((s: any, idx: number) => (
          <div key={idx} className={`p-4 rounded border ${selected === idx ? 'border-cyber-purple' : 'border-cyber-blue/20'} bg-black/30 cursor-pointer`} onClick={() => setSelected(idx)}>
            <div className="text-sm text-cyber-white/70">From: {s.sender}</div>
            <div className="text-cyber-white font-medium">{s.subject}</div>
            <div className="text-cyber-white/80 text-sm">{s.body}</div>
            {selected === idx && (
              <div className="mt-3 text-xs text-cyber-white/70">Cues: {s.cues.join(', ')} — This is {s.isPhish ? 'Phishing' : 'Safe'}</div>
            )}
          </div>
        ))}
      </div>
    )
  }

  function DragDrop({ data }: { data: any }) {
    const [buckets, setBuckets] = useState<Record<string, string[]>>({ Safe: [], Phishing: [] })
    const [pool, setPool] = useState<string[]>(data.items.map((i: any) => i.id))
    const map = useMemo(() => Object.fromEntries(data.items.map((i: any) => [i.id, i])), [data])
    function onDrop(bucket: string, id: string) {
      setBuckets(prev => ({ ...prev, [bucket]: [...new Set([...(prev[bucket] || []), id])] }))
      setPool(prev => prev.filter(x => x !== id))
    }
    function score() {
      let correct = 0
      let total = 0
      for (const id of Object.keys(map)) {
        total += 1
        const placed = Object.entries(buckets).find(([, ids]) => ids.includes(id))?.[0]
        if (placed && map[id].label === placed) correct += 1
      }
      return `${correct}/${total}`
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-cyber-white/70">Items</p>
          {pool.map(id => (
            <div key={id} draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', id)} className="p-2 rounded bg-cyber-blue/10 text-cyber-white text-sm">{map[id].text}</div>
          ))}
        </div>
        {data.buckets.map((b: string) => (
          <div key={b} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { const id = e.dataTransfer.getData('text/plain'); onDrop(b, id) }} className="p-4 rounded border border-cyber-blue/20 bg-black/30 min-h-40">
            <div className="text-cyber-white font-semibold mb-2">{b}</div>
            <div className="space-y-2">
              {(buckets[b] || []).map(id => (
                <div key={id} className="p-2 rounded bg-cyber-purple/10 text-cyber-white text-sm">{map[id].text}</div>
              ))}
            </div>
          </div>
        ))}
        <div className="md:col-span-3 text-right text-cyber-white/80 text-sm">Score: {score()}</div>
      </div>
    )
  }

  function LessonView() {
    if (!activeModule) return null
    const lesson = activeModule.content.lessons[activeLessonIdx]
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {lesson.type === 'VIDEO' ? <Video className="h-5 w-5 text-cyber-blue" /> : <BookOpen className="h-5 w-5 text-cyber-blue" />}
            <p className="text-cyber-white font-semibold">{lesson.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <CyberButton variant="secondary" onClick={prevLesson} disabled={activeLessonIdx === 0}>Prev</CyberButton>
            <CyberButton variant="secondary" onClick={nextLesson} disabled={activeLessonIdx >= activeModule.content.lessons.length - 1}>Next</CyberButton>
          </div>
        </div>
        {lesson.type === 'TEXT' && (
          <div className="prose prose-invert max-w-none text-cyper-white">
            <p className="text-cyber-white/90">{lesson.body}</p>
          </div>
        )}
        {lesson.type === 'VIDEO' && lesson.videoUrl && (
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-cyber-blue/20">
            <iframe src={lesson.videoUrl} className="w-full h-full" allow="autoplay; fullscreen; picture-in-picture" title="Training video" />
          </div>
        )}
        {lesson.type === 'INTERACTIVE_EMAIL' && <EmailInteractive data={lesson.interactive} />}
        {lesson.type === 'DRAG_DROP' && <DragDrop data={lesson.interactive} />}
        {lesson.type === 'TIPS' && (
          <ul className="list-disc pl-5 space-y-1 text-cyber-white/90">
            {(lesson.tips || []).map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        )}
      </div>
    )
  }

  function QuizView() {
    return (
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-cyber-purple" />
            <p className="text-cyber-white font-semibold">{quizMode === 'final' ? 'Final Assessment' : 'Module Quiz'}</p>
          </div>
          <button onClick={() => setQuizMode('idle')} className="text-cyber-white/60 hover:text-cyber-white"><X className="h-4 w-4" /></button>
        </div>
        <div className="space-y-4">
          {quizQuestions.map((q, idx) => (
            <div key={q.id} className="p-4 rounded border border-cyber-blue/20 bg-black/30">
              <p className="text-cyber-white font-medium mb-2">{idx + 1}. {q.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {(q.options || []).map((opt: string) => {
                  const picked = new Set(answers[q.id] || [])
                  const toggle = () => {
                    const next = new Set(answers[q.id] || [])
                    if (picked.has(opt)) next.delete(opt)
                    else next.add(opt)
                    setAnswers(prev => ({ ...prev, [q.id]: Array.from(next) }))
                  }
                  return (
                    <button key={opt} onClick={toggle} className={`text-left p-2 rounded border ${picked.has(opt) ? 'border-cyber-purple bg-cyber-purple/10' : 'border-cyber-blue/20 bg-black/30'} text-cyber-white text-sm`}>{opt}</button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <CyberButton variant="primary" onClick={submitQuiz}>Submit</CyberButton>
          {scoring && (
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full text-xs ${scoring.passed ? 'bg-cyber-green/10 text-cyber-green' : 'bg-cyber-red/10 text-cyber-red'}`}>{scoring.passed ? 'Passed' : 'Failed'}</div>
              <div className="text-cyber-white">Score: {scoring.scorePercent}%</div>
              {quizMode === 'final' && scoring.passed && (
                <CyberButton variant="secondary" onClick={issueCertificate}><Award className="h-4 w-4 mr-2" />Download Certificate</CyberButton>
              )}
            </div>
          )}
        </div>
      </GlassCard>
    )
  }

  return (
    <Layout>
      <CyberBackground />
      <PageContainer>
        <div className="space-y-6 relative z-10">
          <GlassCard className="bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10">
            <div className="p-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2 text-gradient-cyber">Cybersecurity Training</h1>
                    <p className="text-cyber-white/70">Interactive modules, real-world scenarios, and assessments. Earn your certificate.</p>
                  </div>
                  <div className="flex gap-2">
                    <CyberButton variant="secondary" onClick={() => setShowTour(true)}>Guided Tour</CyberButton>
                    <CyberButton variant="secondary" onClick={downloadChecklist}><Download className="h-4 w-4 mr-2" />PDF Checklist</CyberButton>
                    <CyberButton variant="primary" onClick={() => openModuleQuiz(true)}><Award className="h-4 w-4 mr-2" />Final Assessment</CyberButton>
                  </div>
                </div>
              </motion.div>
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard>
              <div className="p-4">
                <p className="text-cyber-blue mb-2">Overall Progress</p>
                <div className="flex items-center gap-2">
                  <AnimatedCounter value={overallProgress} duration={1200} className="text-2xl font-bold text-white" />
                  <span className="text-white">%</span>
                </div>
                <Progress value={overallProgress} className="mt-3" />
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-4">
                <p className="text-cyber-blue mb-2">Modules</p>
                <div className="text-xl font-bold">{modules.length}</div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-4">
                <p className="text-cyber-blue mb-2">Active Defense</p>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-cyber-green" />
                  <span className="text-cyber-green">Protected</span>
                </div>
              </div>
            </GlassCard>
          </div>

          <GlassCard>
            <div className="p-4 flex gap-4 overflow-x-auto">
              {categories.map(cat => (
                <CyberButton key={cat.id} variant={selectedCategory === cat.id ? 'primary' : 'secondary'} onClick={() => setSelectedCategory(cat.id)}>
                  {cat.name} ({cat.count})
                </CyberButton>
              ))}
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map(module => {
              const p = progressOf(module.id)
              return (
                <GlassCard key={module.id} className="group hover:border-cyber-purple/50 transition-all duration-300">
                  <div className="relative h-40">
                    <div className="w-full h-full bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/10 rounded-t-md flex items-center justify-center">
                      <span className="text-cyber-white/80 text-lg font-semibold">{module.title}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 z-10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">{module.title}</h3>
                        <span className="text-xs px-2 py-1 rounded bg-cyber-blue/10">{module.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-cyber-white/70 line-clamp-2">{module.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-cyber-blue flex items-center gap-2"><Clock className="w-4 h-4" /> {module.estimated_duration} min</span>
                      <span className="text-xs text-cyber-white/70">{p}%</span>
                    </div>
                    <div>
                      <Progress value={p} />
                    </div>
                    <CyberButton variant="primary" className="w-full" onClick={() => startModule(module)}>
                      <span className="flex items-center gap-2"><Play className="w-4 h-4" /> {p >= 100 ? 'Review' : 'Start'}</span>
                    </CyberButton>
                  </div>
                </GlassCard>
              )
            })}
          </div>

          <AnimatePresence>
            {activeModule && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
                <GlassCard className="max-w-4xl w-full max-h-[85vh] overflow-hidden">
                  <div className="p-4 border-b border-cyber-blue/20 flex items-center justify-between">
                    <div>
                      <p className="text-cyber-white font-semibold">{activeModule.title}</p>
                      <p className="text-cyber-white/60 text-xs">Lesson {activeLessonIdx + 1} / {activeModule.content.lessons.length}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CyberButton variant="secondary" onClick={() => openModuleQuiz(false)}>Take Quiz</CyberButton>
                      <button onClick={() => { setActiveModule(null); setActiveLessonIdx(0) }} className="text-cyber-white/60 hover:text-cyber-white"><X className="h-5 w-5" /></button>
                    </div>
                  </div>
                  <div className="p-6 overflow-y-auto max-h-[65vh]">
                    <LessonView />
                  </div>
                  <div className="p-4 border-t border-cyber-blue/20 flex items-center justify-between">
                    <div className="text-xs text-cyber-white/60">Progress {progressOf(activeModule.id)}%</div>
                    <div className="flex items-center gap-2">
                      <CyberButton variant="secondary" onClick={prevLesson} disabled={activeLessonIdx === 0}>Prev</CyberButton>
                      <CyberButton variant="primary" onClick={nextLesson} disabled={activeLessonIdx >= activeModule.content.lessons.length - 1}>Next</CyberButton>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {quizMode !== 'idle' && <QuizView />}
        </div>
        <GuidedTour />
      </PageContainer>
    </Layout>
  )
}