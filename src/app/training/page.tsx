'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Clock, Star, Play, CheckCircle, Shield } from 'lucide-react'
import CyberBackground from '@/components/ui/CyberBackground'
import { GlassCard } from '@/components/ui/GlassCard'
import { CyberButton } from '@/components/ui/cyber-button'
import { Progress } from '@/components/ui/Progress'
import { useAuth } from '@/hooks/useAuth'
import Layout, { PageContainer } from '@/components/layout/Layout'
import { CyberParticles } from '@/components/ui/CyberParticles'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { motion } from 'framer-motion'

interface Lesson {
  title: string
  content: string
}

interface TrainingModule {
  id: string
  title: string
  description: string
  category: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  completed: boolean
  score: number | null
  lessons: Lesson[]
  thumbnail: string
}

interface ModuleProgress {
  completed: boolean
  progress: number
  currentLesson: number
}

const modules: TrainingModule[] = [
  {
    id: 'phishing-1',
    title: 'Advanced Phishing Detection',
    description: 'Learn to identify sophisticated phishing attempts and social engineering tactics',
    category: 'phishing',
    duration: '45 minutes',
    difficulty: 'Intermediate',
    completed: false,
    score: null,
    lessons: [
      { title: 'Modern Phishing Techniques', content: 'Understanding advanced phishing methods like spear phishing and whaling' },
      { title: 'Email Security Analysis', content: 'How to analyze email headers and spot suspicious patterns' },
      { title: 'Social Engineering Defense', content: 'Protecting against manipulation tactics and psychological triggers' }
    ],
    thumbnail: '/images/phishing-advanced.jpg'
  },
  {
    id: 'passwords-1',
    title: 'Password Security Masterclass',
    description: 'Create and manage secure passwords using modern best practices',
    category: 'passwords',
    duration: '30 minutes',
    difficulty: 'Beginner',
    completed: false,
    score: null,
    lessons: [
      { title: 'Password Creation Principles', content: 'Understanding entropy and creating memorable yet secure passwords' },
      { title: 'Password Managers', content: 'Using password managers effectively and securely' }
    ],
    thumbnail: '/images/password-security.jpg'
  },
  {
    id: 'social-1',
    title: 'Social Engineering Defense',
    description: 'Recognize and prevent social engineering attacks in the workplace',
    category: 'social',
    duration: '45 minutes',
    difficulty: 'Intermediate',
    completed: false,
    score: null,
    lessons: [
      { title: 'Psychology of Attacks', content: 'Understanding the psychological principles exploited by attackers' },
      { title: 'Common Techniques', content: 'Identifying and responding to common social engineering tactics' },
      { title: 'Prevention Strategies', content: 'Building organizational resilience against social engineering' }
    ],
    thumbnail: '/images/social-eng.jpg'
  },
  {
    id: 'mobile-1',
    title: 'Mobile Device Security',
    description: 'Protect your mobile devices from cyber threats and data breaches',
    category: 'mobile',
    duration: '30 minutes',
    difficulty: 'Intermediate',
    completed: false,
    score: null,
    lessons: [
      { title: 'Device Encryption', content: 'Implementing strong encryption on mobile devices' },
      { title: 'App Security', content: 'Managing application permissions and security' },
      { title: 'Secure Communications', content: 'Protecting mobile communications and data transfer' }
    ],
    thumbnail: '/images/mobile-security.jpg'
  },
  {
    id: 'data-1',
    title: 'Data Protection Fundamentals',
    description: 'Essential practices for protecting sensitive data',
    category: 'data',
    duration: '35 minutes',
    difficulty: 'Beginner',
    completed: false,
    score: null,
    lessons: [
      { title: 'Data Classification', content: 'Understanding different types of sensitive data and their requirements' },
      { title: 'Encryption Basics', content: 'Introduction to data encryption and best practices' },
      { title: 'Secure Data Handling', content: 'Guidelines for storing and transmitting sensitive information' }
    ],
    thumbnail: '/images/data-protection.jpg'
  }
]

const categories = [
  { id: 'all', name: 'All Modules', count: modules.length },
  { id: 'phishing', name: 'Phishing Security', count: modules.filter(m => m.category === 'phishing').length },
  { id: 'passwords', name: 'Password Security', count: modules.filter(m => m.category === 'passwords').length },
  { id: 'social', name: 'Social Engineering', count: modules.filter(m => m.category === 'social').length },
  { id: 'data', name: 'Data Protection', count: modules.filter(m => m.category === 'data').length },
  { id: 'mobile', name: 'Mobile Security', count: modules.filter(m => m.category === 'mobile').length }
]

export default function TrainingPage() {
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [moduleProgress, setModuleProgress] = useState<Map<string, ModuleProgress>>(new Map())
  const [overallProgress, setOverallProgress] = useState(0)

  useEffect(() => {
    const progress = new Map<string, ModuleProgress>()
    modules.forEach(module => {
      progress.set(module.id, {
        completed: Math.random() > 0.7,
        progress: Math.floor(Math.random() * 100),
        currentLesson: 0
      })
    })
    setModuleProgress(progress)
    const total = Array.from(progress.values()).reduce((acc, curr) => acc + curr.progress, 0)
    setOverallProgress(Math.floor(total / modules.length) || 0)
  }, [])

  const filteredModules = selectedCategory === 'all' ? modules : modules.filter(m => m.category === selectedCategory)

  return (
    <Layout>
      <CyberBackground />
      <PageContainer>
        <div className="space-y-6 relative z-10">
          <GlassCard className="bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10">
            <div className="p-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-3xl font-bold mb-2 text-gradient-cyber">Neural Training Matrix</h1>
                <p className="text-cyber-white/70">Master cybersecurity through advanced neural training modules</p>
              </motion.div>
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard>
              <div className="p-4">
                <p className="text-cyber-blue mb-2">Overall Progress</p>
                <div className="flex items-center gap-4">
                  <AnimatedCounter value={overallProgress} duration={1500} className="text-2xl font-bold text-white" />
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
              const progress = moduleProgress.get(module.id) || { progress: 0, completed: false, currentLesson: 0 }
              return (
                <GlassCard key={module.id} className="group hover:border-cyber-purple/50 transition-all duration-300">
                  <div className="relative h-40">
                    <img src={module.thumbnail} alt={module.title} className="w-full h-full object-cover rounded-t-md" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 z-10">
                      <h3 className="text-lg font-bold text-white">{module.title}</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-cyber-white/70 line-clamp-2">{module.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-cyber-blue flex items-center gap-2"><Clock className="w-4 h-4" /> {module.duration}</span>
                      <span className="text-xs px-2 py-1 rounded bg-cyber-blue/10">{module.difficulty}</span>
                    </div>
                    <div>
                      <Progress value={progress.progress} />
                    </div>
                    <CyberButton variant="primary" className="w-full">
                      {progress.completed ? (
                        <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Review</span>
                      ) : (
                        <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Start</span>
                      )}
                    </CyberButton>
                  </div>
                </GlassCard>
              )
            })}
          </div>
        </div>
      </PageContainer>
    </Layout>
  )
}