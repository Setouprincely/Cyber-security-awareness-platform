'use client'

import React from 'react'
import { useAuthProvider, AuthContext } from '@/hooks/useAuth'
import { WebSocketProvider } from './WebSocketProvider'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuthProvider()

  return (
    <AuthContext.Provider value={auth}>
      <WebSocketProvider user={auth.user}>
        {children}
      </WebSocketProvider>
    </AuthContext.Provider>
  )
}