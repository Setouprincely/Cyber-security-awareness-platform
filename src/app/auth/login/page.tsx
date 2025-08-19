'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  EyeIcon, 
  EyeSlashIcon, 
  ShieldCheckIcon, 
  EnvelopeIcon, 
  LockClosedIcon, 
  ArrowLeftIcon 
} from '@heroicons/react/24/outline'
import Layout from '@/components/layout/Layout'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const { user, login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const redirectTo = searchParams?.get('redirect') || '/dashboard'
      router.push(redirectTo)
    }
  }, [user, searchParams, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(formData.email, formData.password)
      
      toast.success('Access Granted! Welcome to the Cyber Defense Network', {
        style: {
          background: 'rgba(10, 10, 35, 0.9)',
          border: '1px solid #00FF41',
          color: '#E0E0E0',
          boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)'
        }
      })
      
    } catch (error: any) {
      toast.error(error.message || 'Access Denied - Authentication Failed', {
        style: {
          background: 'rgba(10, 10, 35, 0.9)',
          border: '1px solid #FF073A',
          color: '#E0E0E0',
          boxShadow: '0 0 20px rgba(255, 7, 58, 0.3)'
        }
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <Layout showNavbar={false} showParticles={true}>
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Glassmorphism Card */}
          <motion.div
            className="glass-cyber-dark p-8 rounded-xl relative overflow-hidden border border-cyber-blue/30"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div
                className="mx-auto h-20 w-20 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-2xl flex items-center justify-center transform -rotate-12 shadow-xl mb-6 relative"
                whileHover={{
                  rotate: -6,
                  scale: 1.05,
                }}
                transition={{ duration: 0.3 }}
              >
                <ShieldCheckIcon className="h-10 w-10 text-white transform rotate-12" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-2xl opacity-0"
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <motion.h2
                className="text-3xl font-bold text-gradient-cyber mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                NEURAL ACCESS
              </motion.h2>

              <motion.p
                className="text-cyber-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Enter the Defense Network
              </motion.p>
            </motion.div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-cyber-white/50" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-cyber pl-10 pr-4 py-3 w-full"
                  placeholder="Enter your neural network ID"
                  required
                />
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-cyber-white/50" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-cyber pl-10 pr-12 py-3 w-full"
                  placeholder="Enter your security passphrase"
                  required
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-cyber-white/50 hover:text-cyber-blue transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </motion.button>
              </motion.div>

              {/* Remember Me & Forgot Password */}
              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-cyber-blue focus:ring-cyber-blue/20 border-cyber-blue/30 rounded bg-transparent"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-cyber-white/70">
                    Remember neural pattern
                  </label>
                </div>

                <motion.button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm font-medium text-cyber-blue hover:text-cyber-purple transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset Access Code?
                </motion.button>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-cyber-primary w-full py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" color="white" />
                      <span>ACCESSING NETWORK...</span>
                    </>
                  ) : (
                    <span>INITIATE ACCESS</span>
                  )}
                </button>
              </motion.div>
            </form>

            {/* Demo Accounts */}
            <motion.div
              className="mt-6 border-t border-cyber-blue/20 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <p className="text-sm text-cyber-white/60 text-center mb-4">Demo Access Codes:</p>
              <div className="space-y-2 text-xs text-cyber-white/50">
                <motion.div
                  className="glass-cyber p-2 rounded border border-cyber-blue/20"
                  whileHover={{ borderColor: 'rgba(0, 212, 255, 0.5)' }}
                >
                  <strong className="text-cyber-blue">Admin:</strong> admin@cybersecurity-platform.com / admin123!
                </motion.div>
                <motion.div
                  className="glass-cyber p-2 rounded border border-cyber-purple/20"
                  whileHover={{ borderColor: 'rgba(139, 0, 255, 0.5)' }}
                >
                  <strong className="text-cyber-purple">Trainee:</strong> john.doe@example.com / trainee123!
                </motion.div>
              </div>
            </motion.div>

            {/* Sign Up Link */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <p className="text-sm text-cyber-white/60">
                Need network access?{' '}
                <Link
                  href="/auth/register"
                  className="font-medium text-cyber-pink hover:text-cyber-blue transition-colors"
                >
                  Request Authorization
                </Link>
              </p>
            </motion.div>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Link
              href="/"
              className="inline-flex items-center text-sm text-cyber-white/50 hover:text-cyber-blue transition-colors group"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Return to Surface Web
            </Link>
          </motion.div>
        </motion.div>

        {/* Forgot Password Modal */}
        <AnimatePresence>
          {showForgotPassword && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForgotPassword(false)}
            >
              <motion.div
                className="glass-cyber-dark p-6 rounded-xl max-w-md w-full mx-4 border border-cyber-blue/30"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-gradient-cyber mb-4">Reset Access Code</h3>
                <p className="text-cyber-white/70 mb-4">
                  Enter your neural network ID to receive reset instructions.
                </p>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-cyber-white/50" />
                  </div>
                  <input
                    type="email"
                    className="input-cyber pl-10 pr-4 py-3 w-full"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowForgotPassword(false)}
                    className="flex-1 px-4 py-2 border border-cyber-blue/30 rounded-lg text-cyber-white hover:bg-cyber-blue/10 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 btn-cyber-primary py-2"
                    onClick={() => {
                      toast.success('Reset instructions sent to your neural interface', {
                        style: {
                          background: 'rgba(10, 10, 35, 0.9)',
                          border: '1px solid #00FF41',
                          color: '#E0E0E0',
                          boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)'
                        }
                      })
                      setShowForgotPassword(false)
                    }}
                  >
                    Send Reset
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  )
}