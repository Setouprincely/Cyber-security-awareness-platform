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
import Layout from '@/components/layout/Layout'

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
      router.replace('/auth/login?redirect=' + encodeURIComponent(pathname))
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
    <Layout>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </Layout>
  )
}