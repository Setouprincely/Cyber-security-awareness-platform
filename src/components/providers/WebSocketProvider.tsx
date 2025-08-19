'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

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

  useEffect(() => {
    if (user && !socket) {
      connectWebSocket()
    }

    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [user, socket])

  const connectWebSocket = () => {
    try {
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'
      const ws = new WebSocket(`${wsUrl}?userId=${user?.id}`)

      ws.onopen = () => {
        console.log('WebSocket connected')
        setIsConnected(true)
        setSocket(ws)
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
        setIsConnected(false)
        setSocket(null)
        
        // Attempt to reconnect after 3 seconds
        setTimeout(() => {
          if (user) {
            connectWebSocket()
          }
        }, 3000)
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setIsConnected(false)
      }
    } catch (error) {
      console.error('Failed to connect WebSocket:', error)
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
    setEventListeners(prev => {
      const newMap = new Map(prev)
      if (!newMap.has(event)) {
        newMap.set(event, new Set())
      }
      newMap.get(event)!.add(callback)
      return newMap
    })

    // Return unsubscribe function
    return () => {
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