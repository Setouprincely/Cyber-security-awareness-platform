'use client'

import { useAuth } from '@/hooks/useAuth'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Shield, LogOut, Home, UserCircle, Bell, Settings } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { CyberButton } from '@/components/ui/cyber-button'
import CyberBackground from '@/components/ui/CyberBackground'
import { CyberParticles } from '@/components/ui/CyberParticles'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Training', href: '/training', icon: Shield },
  { name: 'Simulations', href: '/simulations', icon: Shield },
  { name: 'Profile', href: '/profile', icon: UserCircle },
]

const adminNavigation = [
  { name: 'Admin', href: '/admin', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      console.log('🚫 No user found, redirecting to login')
      router.push('/auth/login?redirect=' + encodeURIComponent(pathname))
    }
  }, [user, loading, router, pathname])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const allNavigation = user?.role === 'admin' 
    ? [...navigation, ...adminNavigation]
    : navigation

  // Show loading spinner only when actually loading, not when user is null
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-blue mx-auto mb-4"></div>
          <p className="text-cyber-blue">Initializing system...</p>
        </div>
      </div>
    )
  }

  // If not loading and no user, redirect will be handled by middleware
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-cyber-blue">Establishing secure connection...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <CyberBackground />
      <CyberParticles />
      
      {/* Top Navigation */}
      <GlassCard className="sticky top-0 z-50 backdrop-blur-md bg-black/50 border-b border-cyber-blue/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-cyber-blue" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                Neural Command Center
              </span>
            </div>

            <nav className="hidden md:flex space-x-4">
              {allNavigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link key={item.name} href={item.href}>
                    <CyberButton
                      variant={isActive ? 'primary' : 'secondary'}
                      className="flex items-center space-x-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </CyberButton>
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center space-x-4">
              <button className="text-cyber-blue hover:text-cyber-purple">
                <Bell className="h-6 w-6" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-cyber-blue">{user.name}</p>
                  <p className="text-xs text-cyber-purple/80 capitalize">{user.role?.toLowerCase()}</p>
                </div>
                <CyberButton
                  variant="danger"
                  onClick={handleLogout}
                  className="ml-2"
                >
                  <LogOut className="h-4 w-4" />
                </CyberButton>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}