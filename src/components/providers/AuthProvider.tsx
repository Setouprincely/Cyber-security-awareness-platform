'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { AuthUser } from '@/types'
import { supabase } from '@/lib/supabase'
import { validateSession, signOut } from '@/lib/auth'

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  setUser: (user: AuthUser | null) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial session check
    checkSession()

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const user = await validateSession(session.access_token)
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      const user = await validateSession(session.access_token)
      setUser(user)
    }
    setLoading(false)
  }

  const logout = async () => {
    try {
      await signOut()
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const value = {
    user,
    loading,
    setUser,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
