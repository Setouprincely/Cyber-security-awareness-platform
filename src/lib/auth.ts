import { supabase } from './supabase'
import { AuthUser, UserRole } from '@/types'

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  // Get the user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single()

  return {
    user: {
      id: data.user.id,
      email: data.user.email || '',
      name: profile?.name || '',
      role: profile?.role as UserRole,
    },
    session: data.session,
  }
}

export async function signUp(email: string, password: string, name: string) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        role: 'TRAINEE' as UserRole,
      },
    },
  })

  if (authError) {
    throw new Error(authError.message)
  }

  // Create profile
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          email: authData.user.email,
          name,
          role: 'TRAINEE',
        },
      ])

    if (profileError) {
      throw new Error(profileError.message)
    }
  }

  return authData
}

export async function validateSession(token: string): Promise<AuthUser | null> {
  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    return null
  }

  // Get the user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    return null
  }

  return {
    id: user.id,
    email: user.email!,
    name: profile.name,
    role: profile.role as UserRole,
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  }
}

export async function getUserById(id: string): Promise<AuthUser | null> {
  const { data: user } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (!user) return null

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as UserRole,
  }
}

export async function getUserByEmail(email: string): Promise<AuthUser | null> {
  const { data: user } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)
    .single()

  if (!user) return null

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as UserRole,
  }
}

export function requireAuth(user: AuthUser | null): AuthUser {
  if (!user) {
    throw new Error('Authentication required')
  }
  return user
}

export function requireAdmin(user: AuthUser | null): AuthUser {
  const authUser = requireAuth(user)
  if (authUser.role !== UserRole.ADMIN) {
    throw new Error('Admin access required')
  }
  return authUser
}

export function isAdmin(user: AuthUser | null): boolean {
  return user?.role === UserRole.ADMIN
}

export function isTrainee(user: AuthUser | null): boolean {
  return user?.role === UserRole.TRAINEE
}
