'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestConnectionPage() {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setResult('Testing connection...')
    
    try {
      // Test basic connection
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)
      
      if (error) {
        setResult(`❌ Connection failed: ${error.message}`)
      } else {
        setResult(`✅ Connection successful! Profiles table accessible.`)
      }
    } catch (error: any) {
      setResult(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const testAuth = async () => {
    setLoading(true)
    setResult('Testing authentication...')
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'john.doe@example.com',
        password: 'trainee123!'
      })
      
      if (error) {
        setResult(`❌ Auth failed: ${error.message}`)
      } else {
        setResult(`✅ Auth successful! User: ${data.user?.email}`)
        
        // Sign out immediately
        await supabase.auth.signOut()
      }
    } catch (error: any) {
      setResult(`❌ Auth error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Supabase Connection Test</h1>
        
        <div className="space-y-4">
          <button
            onClick={testConnection}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Database Connection'}
          </button>
          
          <button
            onClick={testAuth}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 ml-4"
          >
            {loading ? 'Testing...' : 'Test Authentication'}
          </button>
        </div>
        
        {result && (
          <div className="mt-6 p-4 bg-white rounded border">
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        )}
        
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-semibold mb-2">Environment Check:</h3>
          <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
          <p>Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
        </div>
      </div>
    </div>
  )
}