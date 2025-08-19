import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateSession } from '@/lib/auth'

// Define protected routes
const protectedRoutes = [
  '/dashboard',
  '/training',
  '/simulations',
  '/analytics',
  '/profile',
  '/admin',
]

// Define admin-only routes
const adminRoutes = [
  '/admin',
  '/analytics',
]

// Define auth routes (redirect if already logged in)
const authRoutes = [
  '/auth/login',
  '/auth/register',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // Temporarily disable middleware to test authentication
  console.log(`🔍 Middleware: ${pathname} - ALLOWING ALL REQUESTS FOR TESTING`)
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
  ],
}