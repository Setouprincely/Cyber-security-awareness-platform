'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useWebSocket } from '@/components/providers/WebSocketProvider'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
  actionUrl?: string
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  let wsAvailable = false
  try {
    // useWebSocket is only usable within provider; guard in case of misuse
    // If provider not present, this will throw and we skip realtime
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ws = useWebSocket()
    wsAvailable = !!ws
  } catch (_) {
    wsAvailable = false
  }
  // Retrieve within try/catch scope again for types
  const webSocketContext = (() => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useWebSocket()
    } catch {
      return undefined
    }
  })()

  useEffect(() => {
    if (user) {
      fetchNotifications()
    } else {
      // Reset notifications when user logs out
      setNotifications([])
      setUnreadCount(0)
      setLoading(false)
    }
  }, [user])

  // Real-time notifications via global WebSocket provider
  useEffect(() => {
    if (!user || !webSocketContext) return
    const unsubscribe = webSocketContext.subscribe('notification', (payload: any) => {
      const incoming = {
        id: payload.id || `${Date.now()}`,
        title: payload.title || 'Notification',
        message: payload.message || '',
        type: (payload.type || 'info') as Notification['type'],
        read: false,
        createdAt: payload.createdAt || new Date().toISOString(),
        actionUrl: payload.actionUrl,
      }
      setNotifications(prev => [incoming, ...prev])
      setUnreadCount(prev => prev + 1)
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        // Browser toast
        try {
          new Notification(incoming.title, { body: incoming.message, icon: '/favicon.ico' })
        } catch {}
      }
    })
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [user, webSocketContext])

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications', {
        credentials: 'include'
      })
      
      if (response.ok) {
        const data = await response.json()
        setNotifications(data.notifications)
        setUnreadCount(data.unreadCount)
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
      // Set some mock notifications for development
      const mockNotifications = [
        {
          id: '1',
          title: 'Welcome to Cyber Defense Network',
          message: 'Your neural interface is now active',
          type: 'info' as const,
          read: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Training Module Available',
          message: 'New quantum encryption module is ready',
          type: 'success' as const,
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        }
      ]
      setNotifications(mockNotifications)
      setUnreadCount(mockNotifications.filter(n => !n.read).length)
    } finally {
      setLoading(false)
    }
  }

  const setupWebSocket = () => {
    try {
      // WebSocket connection for real-time notifications
      const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'}/notifications`)
      
      ws.onmessage = (event) => {
        const notification = JSON.parse(event.data)
        setNotifications(prev => [notification, ...prev])
        setUnreadCount(prev => prev + 1)
        
        // Show browser notification if permission granted
        if (Notification.permission === 'granted') {
          new Notification(notification.title, {
            body: notification.message,
            icon: '/favicon.ico'
          })
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

      return () => {
        ws.close()
      }
    } catch (error) {
      console.error('Failed to setup WebSocket:', error)
    }
  }

  const markAsRead = async (notificationId: string) => {
    try {
      // For development, just update local state
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, read: true }
            : notif
        )
      )
      
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, read: true }))
      )
      
      setUnreadCount(0)
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error)
    }
  }

  const deleteNotification = async (notificationId: string) => {
    try {
      const deletedNotification = notifications.find(n => n.id === notificationId)
      
      setNotifications(prev => 
        prev.filter(notif => notif.id !== notificationId)
      )
      
      if (deletedNotification && !deletedNotification.read) {
        setUnreadCount(prev => Math.max(0, prev - 1))
      }
    } catch (error) {
      console.error('Failed to delete notification:', error)
    }
  }

  // Request notification permission on first load
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refetch: fetchNotifications
  }
}