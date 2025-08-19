'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, signUp, signOut } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'instructor' | 'user'
  avatar?: string
  createdAt: string
  lastLogin?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (userData: any) => Promise<void>
  updateProfile: (userData: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthContext }

export function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check the current auth session
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error

        if (session?.user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (profileError) throw profileError

          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: profile.name,
            role: profile.role || 'user',
            avatar: profile.avatar,
            createdAt: profile.created_at,
            lastLogin: profile.last_login
          })
        }
      } catch (error) {
        console.error('Session check error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profile) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: profile.name,
            role: profile.role || 'user',
            avatar: profile.avatar,
            createdAt: profile.created_at,
            lastLogin: profile.last_login
          })
        }
      } else {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()

      const userData: User = {
        id: data.user.id,
        email: data.user.email!,
        name: profile.name,
        role: profile.role || 'user',
        avatar: profile.avatar,
        createdAt: profile.created_at,
        lastLogin: new Date().toISOString()
      }

      setUser(userData)
      router.push('/dashboard')
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  const register = async (userData: any) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            role: 'user'
          }
        }
      })

      if (error) throw error

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            name: userData.name,
            email: userData.email,
            role: 'user',
            created_at: new Date().toISOString()
          })

        if (profileError) throw profileError

        // Auto-login after registration
        await login(userData.email, userData.password)
      }
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (userData: Partial<User>) => {
    try {
      if (!user) throw new Error('No user logged in')

      const { error } = await supabase
        .from('profiles')
        .update({
          name: userData.name,
          avatar: userData.avatar,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) throw error

      setUser({ ...user, ...userData })
    } catch (error) {
      throw error
    }
  }

  return {
    user,
    loading,
    setUser,
    login,
    logout,
    register,
    updateProfile
  }
}