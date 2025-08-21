#!/usr/bin/env node

/**
 * Simple WebSocket Server for Cyber Security Awareness Platform
 * 
 * This is an optional WebSocket server that provides real-time features.
 * Run this server if you want to enable real-time notifications and updates.
 * 
 * Usage:
 *   node src/lib/websocket-server.js
 * 
 * Then set NEXT_PUBLIC_WS_ENABLED=true in your .env.local file
 */

const WebSocket = require('ws')
const http = require('http')
const url = require('url')

const PORT = process.env.WS_PORT || 3001

// Create HTTP server
const server = http.createServer()

// Create WebSocket server
const wss = new WebSocket.Server({ 
  server,
  verifyClient: (info) => {
    // Basic verification - in production, add proper authentication
    const query = url.parse(info.req.url, true).query
    return query.userId !== undefined
  }
})

// Store connected clients
const clients = new Map()

wss.on('connection', (ws, req) => {
  const query = url.parse(req.url, true).query
  const userId = query.userId

  console.log(`Client connected: ${userId}`)
  
  // Store client connection
  clients.set(userId, ws)

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'connection',
    payload: {
      message: 'Connected to WebSocket server',
      timestamp: new Date().toISOString()
    }
  }))

  // Handle incoming messages
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data)
      console.log(`Message from ${userId}:`, message)

      // Echo message back or broadcast to other clients
      // This is where you'd implement your real-time logic
      
    } catch (error) {
      console.error('Error parsing message:', error)
    }
  })

  // Handle client disconnect
  ws.on('close', () => {
    console.log(`Client disconnected: ${userId}`)
    clients.delete(userId)
  })

  // Handle errors
  ws.on('error', (error) => {
    console.error(`WebSocket error for ${userId}:`, error)
    clients.delete(userId)
  })
})

// Broadcast function to send messages to all connected clients
function broadcast(type, payload) {
  const message = JSON.stringify({ type, payload })
  
  clients.forEach((ws, userId) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message)
    } else {
      clients.delete(userId)
    }
  })
}

// Simulate some real-time events for demonstration
setInterval(() => {
  if (clients.size > 0) {
    broadcast('stats_update', {
      timestamp: new Date().toISOString(),
      activeUsers: clients.size,
      message: 'Real-time stats update'
    })
  }
}, 30000) // Every 30 seconds

// Start the server
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`)
  console.log(`WebSocket URL: ws://localhost:${PORT}`)
  console.log('Connected clients will receive real-time updates')
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down WebSocket server...')
  wss.close(() => {
    server.close(() => {
      process.exit(0)
    })
  })
})

process.on('SIGINT', () => {
  console.log('Shutting down WebSocket server...')
  wss.close(() => {
    server.close(() => {
      process.exit(0)
    })
  })
})