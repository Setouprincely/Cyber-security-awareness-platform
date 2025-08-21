'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

interface WebSocketContextType {
  socket: WebSocket | null
  isConnected: boolean
  sendMessage: (message: any) => void
  subscribe: (event: string, callback: (data: any) => void) => () => void
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

export function useWebSocket() {
  const context = useContext(WebSocketContext)
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }
  return context
}

interface WebSocketProviderProps {
  children: React.ReactNode
  user?: any // Accept user as prop to avoid circular dependency
}

export function WebSocketProvider({ children, user }: WebSocketProviderProps) {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [eventListeners, setEventListeners] = useState<Map<string, Set<(data: any) => void>>>(new Map())
  const [connectionAttempts, setConnectionAttempts] = useState(0)
  const [maxRetries] = useState(3) // Limit retry attempts
  const mountedRef = useRef(true)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    // Only attempt WebSocket connection if explicitly enabled
    const wsEnabled = process.env.NEXT_PUBLIC_WS_ENABLED === 'true'
    
    if (user && !socket && wsEnabled && connectionAttempts < maxRetries) {
      connectWebSocket()
    }

    return () => {
      try {
        if (socket) {
          socket.close()
        }
      } catch {}
    }
  }, [user, socket, connectionAttempts, maxRetries])

  const connectWebSocket = () => {
    try {
      setConnectionAttempts(prev => prev + 1)
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'
      const ws = new WebSocket(`${wsUrl}?userId=${user?.id}`)

      ws.onopen = () => {
        console.log('WebSocket connected')
        if (mountedRef.current) {
          setIsConnected(true)
          setSocket(ws)
          setConnectionAttempts(0) // Reset attempts on successful connection
        }
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          const { type, payload } = data

          // Emit to all listeners for this event type
          const listeners = eventListeners.get(type)
          if (listeners) {
            listeners.forEach(callback => callback(payload))
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      ws.onclose = () => {
        console.log('WebSocket disconnected')
        if (mountedRef.current) {
          setIsConnected(false)
          setSocket(null)
        }
        
        // Only attempt to reconnect if we haven't exceeded max retries
        if (connectionAttempts < maxRetries) {
          setTimeout(() => {
            if (mountedRef.current && user && connectionAttempts < maxRetries) {
              connectWebSocket()
            }
          }, 3000)
        } else {
          console.warn('WebSocket max retry attempts reached. Real-time features disabled.')
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        if (mountedRef.current) setIsConnected(false)
      }
    } catch (error) {
      console.error('Failed to connect WebSocket:', error)
      setConnectionAttempts(prev => prev + 1)
    }
  }

  const sendMessage = (message: any) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message))
    } else {
      console.warn('WebSocket not connected, message not sent:', message)
    }
  }

  const subscribe = (event: string, callback: (data: any) => void) => {
    if (mountedRef.current) {
      setEventListeners(prev => {
        const newMap = new Map(prev)
        if (!newMap.has(event)) {
          newMap.set(event, new Set())
        }
        newMap.get(event)!.add(callback)
        return newMap
      })
    }

    // Return unsubscribe function
    return () => {
      if (!mountedRef.current) return
      setEventListeners(prev => {
        const newMap = new Map(prev)
        const listeners = newMap.get(event)
        if (listeners) {
          listeners.delete(callback)
          if (listeners.size === 0) {
            newMap.delete(event)
          }
        }
        return newMap
      })
    }
  }

  const value: WebSocketContextType = {
    socket,
    isConnected,
    sendMessage,
    subscribe
  }

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  )
}