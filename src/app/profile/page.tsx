'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { User, Mail, Shield, Calendar, Award, Settings, Bell, Lock, Cpu, Terminal, LineChart } from 'lucide-react'
import CyberBackground from '@/components/ui/CyberBackground'
import { GlassCard } from '@/components/ui/GlassCard'
import { CyberButton } from '@/components/ui/cyber-button'
import Layout, { PageContainer } from '@/components/layout/Layout'
import { CyberParticles } from '@/components/ui/CyberParticles'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { Progress } from '@/components/ui/Progress'
import { SkillHexagon } from '@/components/ui/SkillHexagon'
import { motion } from 'framer-motion'

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [stats, setStats] = useState({
    securityScore: 85,
    threatDetectionAccuracy: 92,
    incidentResponseTime: 15, // minutes
    vulnerabilitiesPatched: 47,
    modulesCompleted: 12,
    totalModules: 20,
    simulationsPassed: 8,
    totalSimulations: 10,
    learningStreak: 5,
    lastActive: '2 hours ago',
    certifications: ['CEH', 'Security+', 'CISSP'],
    skillLevels: {
      incidentResponse: 85,
      threatHunting: 78,
      malwareAnalysis: 92,
      networkSecurity: 88,
      cloudSecurity: 76
    }
  })
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: 'Information Technology',
    jobTitle: 'Software Developer',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [pwdChanging, setPwdChanging] = useState(false)
  const [certificates, setCertificates] = useState<Array<{ id: string; course_name: string; score: number; issued_at: string; pdf_data_url?: string }>>([])

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        securityScore: Math.min(100, prev.securityScore + (Math.random() > 0.7 ? 1 : 0))
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const renderSkillGrid = () => {
    const colors = {
      incidentResponse: '#00ff00',
      threatHunting: '#ff00ff',
      malwareAnalysis: '#00ffff',
      networkSecurity: '#ffff00',
      cloudSecurity: '#ff0000'
    }

    return (
      <motion.div className="grid grid-cols-3 gap-8 mt-6">
        {Object.entries(stats.skillLevels).map(([skill, level], index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SkillHexagon
              skill={skill.replace(/([A-Z])/g, ' $1').trim()}
              level={level}
              color={colors[skill as keyof typeof colors]}
            />
          </motion.div>
        ))}
      </motion.div>
    )
  }

  const achievements = [
    {
      id: 1,
      title: 'Zero-Day Hunter',
      description: 'Successfully identified and mitigated a zero-day vulnerability',
      icon: '<Terminal className="w-6 h-6 text-cyan-500" />',
      earnedAt: '2024-01-15',
      category: 'Advanced',
      xp: 5000,
    },
    {
      id: 2,
      title: 'Threat Intelligence Master',
      description: 'Analyzed and prevented an APT attack scenario',
      icon: '<Shield className="w-6 h-6 text-purple-500" />',
      earnedAt: '2024-01-20',
      category: 'Expert',
      xp: 7500,
    },
    {
      id: 3,
      title: 'Digital Fortress',
      description: 'Achieved perfect score in cloud security assessment',
      icon: '<Cpu className="w-6 h-6 text-blue-500" />',
      earnedAt: '2024-01-25',
      category: 'Elite',
      xp: 10000,
    },
  ]

  const trainingHistory = [
    {
      id: 1,
      title: 'Introduction to Phishing Attacks',
      completedAt: '2024-01-15',
      score: 92,
      duration: '25 min',
    },
    {
      id: 2,
      title: 'Password Security Best Practices',
      completedAt: '2024-01-18',
      score: 88,
      duration: '20 min',
    },
    {
      id: 3,
      title: 'Social Engineering Awareness',
      completedAt: '2024-01-22',
      score: 95,
      duration: '35 min',
    },
  ]

  const handleSave = async () => {
    try {
      // Save profile basic fields via Supabase profile table
      const res = await fetch('/api/auth/me', { method: 'GET' })
      // For now optimistic only; in a full impl, POST to a profile update route
      setIsEditing(false)
    } catch {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      department: 'Information Technology',
      jobTitle: 'Software Developer',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
    })
    setIsEditing(false)
  }

  useEffect(() => {
    // Load certificates
    fetch('/api/training/certificates')
      .then(r => r.json())
      .then(d => {
        if (d && Array.isArray(d.certificates)) setCertificates(d.certificates)
      })
      .catch(() => {})
  }, [])

  return (
    <Layout>
      <PageContainer>
    <div className="space-y-6">
      {/* Header */}
      <GlassCard variant="cyber" className="p-6">
        <div className="flex items-center">
          <div className="h-16 w-16 bg-black/30 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-cyber-white">{user?.name}</h1>
            <p className="text-cyber-blue/70 capitalize">{user?.role?.toLowerCase()} Account</p>
          </div>
        </div>
      </GlassCard>

      {/* Tabs */}
      <GlassCard className="p-0">
        <div className="border-b border-cyber-blue/20">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'profile', name: 'Profile', icon: User },
              { id: 'achievements', name: 'Achievements', icon: Award },
              { id: 'history', name: 'Training History', icon: Calendar },
              { id: 'settings', name: 'Settings', icon: Settings },
            ].map((tab) => (
              <CyberButton
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? 'primary' : 'ghost'}
                size="sm"
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.name}
              </CyberButton>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                {!isEditing ? (
                  <CyberButton onClick={() => setIsEditing(true)} variant="primary">
                    Edit Profile
                  </CyberButton>
                ) : (
                  <div className="space-x-2">
                    <CyberButton onClick={handleCancel} variant="ghost" size="sm">
                      Cancel
                    </CyberButton>
                    <CyberButton onClick={handleSave} variant="primary" size="sm">
                      Save Changes
                    </CyberButton>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                  />
                  <p className="text-xs text-gray-500 mt-1">PNG or JPEG up to 5MB.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.department}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.jobTitle}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.location}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Your Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="border border-gray-200 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-4">{achievement.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{achievement.description}</p>
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      Earned {new Date(achievement.earnedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
              {/* Certificates */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificates</h3>
                <div className="space-y-3">
                  {certificates.length === 0 && <p className="text-sm text-gray-600">No certificates yet.</p>}
                  {certificates.map(c => (
                    <div key={c.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{c.course_name}</p>
                        <p className="text-xs text-gray-600">Score {c.score}% • {new Date(c.issued_at).toLocaleDateString()}</p>
                      </div>
                      {c.pdf_data_url && (
                        <a className="text-primary-600 text-sm underline" href={c.pdf_data_url} download>Download PDF</a>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <CyberButton
                    variant="secondary"
                    onClick={async ()=>{
                      try {
                        const { jsPDF } = await import('jspdf')
                        const doc = new jsPDF()
                        const courseName = 'Cybersecurity Fundamentals'
                        doc.text('Certificate of Completion', 20, 20)
                        doc.text(`Awarded to: ${formData.name || user?.name || 'User'}`, 20, 35)
                        doc.text(`Course: ${courseName}`, 20, 50)
                        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 65)
                        const pdfDataUrl = doc.output('datauristring')
                        const res = await fetch('/api/training/certificates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ courseName, score: 100, pdfDataUrl }) })
                        const data = await res.json()
                        if (res.ok && data.certificate) {
                          setCertificates(prev => [data.certificate, ...prev])
                        }
                      } catch {}
                    }}
                  >
                    Generate Demo Certificate
                  </CyberButton>
                </div>
              </div>
            </div>
          )}

          {/* Training History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Training History</h2>
              <div className="space-y-4">
                {trainingHistory.map((training) => (
                  <div key={training.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{training.title}</h3>
                        <p className="text-sm text-gray-600">
                          Completed on {new Date(training.completedAt).toLocaleDateString()} • {training.duration}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          training.score >= 90 ? 'text-green-600' : 
                          training.score >= 80 ? 'text-blue-600' : 
                          training.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {training.score}%
                        </div>
                        <div className="text-xs text-gray-500">Score</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
              
              <div className="space-y-6">
                {/* Notifications */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Bell className="h-5 w-5 text-gray-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates about new training modules</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Simulation Reminders</p>
                        <p className="text-sm text-gray-600">Get reminded about pending simulations</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600" />
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Lock className="h-5 w-5 text-gray-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Security</h3>
                  </div>
                  <div className="space-y-4">
                    <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <p className="font-medium text-gray-900">Change Password</p>
                      <p className="text-sm text-gray-600">Update your account password</p>
                    </button>
                    <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input type="password" placeholder="Current password" className="px-3 py-2 border border-gray-300 rounded-lg" value={passwords.current} onChange={(e)=>setPasswords({...passwords, current: e.target.value})} />
                      <input type="password" placeholder="New password" className="px-3 py-2 border border-gray-300 rounded-lg" value={passwords.next} onChange={(e)=>setPasswords({...passwords, next: e.target.value})} />
                      <input type="password" placeholder="Confirm new password" className="px-3 py-2 border border-gray-300 rounded-lg" value={passwords.confirm} onChange={(e)=>setPasswords({...passwords, confirm: e.target.value})} />
                    </div>
                    <CyberButton
                      onClick={async ()=>{
                        if (!passwords.next || passwords.next !== passwords.confirm) return
                        setPwdChanging(true)
                        try {
                          const res = await fetch('/api/auth/change-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ currentPassword: passwords.current, newPassword: passwords.next }) })
                          const data = await res.json()
                          if (!res.ok) throw new Error(data?.error || 'Failed')
                          setPasswords({ current: '', next: '', confirm: '' })
                        } catch (e) {
                          // optionally show toast
                        } finally {
                          setPwdChanging(false)
                        }
                      }}
                      variant="primary"
                      disabled={pwdChanging || !passwords.current || !passwords.next || passwords.next !== passwords.confirm}
                    >
                      {pwdChanging ? 'Updating…' : 'Update Password'}
                    </CyberButton>
                    <CyberButton
                      onClick={async ()=>{
                        try {
                          await fetch('/api/auth/logout-all', { method: 'POST' })
                          window.location.href = '/auth/login'
                        } catch {}
                      }}
                      variant="ghost"
                    >
                      Log Out of All Devices
                    </CyberButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
      </PageContainer>
    </Layout>
  )
}