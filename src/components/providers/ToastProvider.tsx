'use client'

import React from 'react'
import { Toaster } from 'react-hot-toast'

interface ToastProviderProps {
  children: React.ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0A0A23',
            color: '#E0E0E0',
            border: '1px solid #00D4FF30',
            borderRadius: '8px',
            backdropFilter: 'blur(8px)',
          },
          success: {
            iconTheme: {
              primary: '#00FF41',
              secondary: '#0A0A23',
            },
          },
          error: {
            iconTheme: {
              primary: '#FF073A',
              secondary: '#0A0A23',
            },
          },
        }}
      />
    </>
  )
}