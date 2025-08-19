import { supabase } from './supabase'
import { AuthUser, UserRole } from '@/types'

export async function signIn(email: string, password: string) {
  try {
    console.log('🔐 Starting sign in process...')
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.log('❌ Supabase auth error:', error.message)
      throw new Error(error.message)
    }

    if (!data.user) {
      console.log('❌ No user returned from Supabase')
      throw new Error('Authentication failed - no user returned')
    }

    console.log('✅ Supabase auth successful, user ID:', data.user.id)

    // Return immediately with basic user info - profile will be loaded by AuthProvider
    return {
      user: {
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata?.name || data.user.email || '',
        role: (data.user.user_metadata?.role as UserRole) || 'TRAINEE',
      },
      session: data.session,
    }
  } catch (error) {
    console.error('❌ Sign in error:', error)
    throw error
  }
}

export async function signUp(email: string, password: string, name: string, role: UserRole = 'TRAINEE') {
  console.log('🔐 Starting signUp process...', { email, name, role })
  
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        role,
      },
    },
  })

  if (authError) {
    console.log('❌ Auth signup error:', authError.message)
    throw new Error(authError.message)
  }

  if (!authData.user) {
    console.log('❌ No user returned from signup')
    throw new Error('Registration failed - no user returned')
  }

  console.log('✅ User created successfully:', authData.user.id)

  // Try to create the profile immediately if the trigger doesn't work
  if (authData.user && !authData.user.email_confirmed_at) {
    console.log('🔄 Creating profile manually since email not confirmed...')
    
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            email: authData.user.email!,
            name: name,
            role: role,
          },
        ])
        .select()
        .single()

      if (profileError) {
        console.log('⚠️ Profile creation failed (might be created by trigger):', profileError.message)
      } else {
        console.log('✅ Profile created manually')
      }
    } catch (error) {
      console.log('⚠️ Manual profile creation error (might be created by trigger):', error)
    }
  }

  return authData
}

export async function validateSession(token: string): Promise<AuthUser | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      console.log('❌ No user found for token:', error?.message)
      return null
    }

    console.log('✅ User found:', user.email)

    // Get the user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      console.log('❌ No profile found for user:', user.id, profileError?.message)
      
      // If profile doesn't exist, try to create it from user metadata
      if (user.user_metadata) {
        console.log('🔄 Attempting to create missing profile...')
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([
            {
              id: user.id,
              email: user.email!,
              name: user.user_metadata.name || user.email!,
              role: user.user_metadata.role || 'TRAINEE',
            },
          ])
          .select()
          .single()

        if (createError) {
          console.log('❌ Failed to create profile:', createError.message)
          return null
        }

        console.log('✅ Profile created successfully')
        return {
          id: user.id,
          email: user.email!,
          name: newProfile.name,
          role: newProfile.role as UserRole,
        }
      }
      
      return null
    }

    console.log('✅ Profile found:', profile.name, profile.role)

    return {
      id: user.id,
      email: user.email!,
      name: profile.name,
      role: profile.role as UserRole,
    }
  } catch (error) {
    console.error('❌ Error in validateSession:', error)
    return null
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
