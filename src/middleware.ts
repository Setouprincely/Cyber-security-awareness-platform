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

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req: request, res: response })

  // Refresh session if expired - required for Server Components
  const { data: { session } } = await supabase.auth.getSession()

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  // Check if the current path is admin-only
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  )

  // If it's a protected route and no session, redirect to login
  if (isProtectedRoute && !session) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If there's a session and trying to access auth routes, redirect to dashboard
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If it's an admin route, check if user has admin role
  if (isAdminRoute && session) {
    const user = await validateSession(session.access_token)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  // Add user info to headers for API routes if we have a session
  if (session && pathname.startsWith('/api/')) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', session.user.id)
    requestHeaders.set('x-user-email', session.user.email ?? '')
    
    // Get the user profile to add role information
    const user = await validateSession(session.access_token)
    if (user) {
      requestHeaders.set('x-user-role', user.role)
    }
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

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
