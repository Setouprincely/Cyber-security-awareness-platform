'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Shield, Mail, Lock, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/components/providers/AuthProvider'
import { signIn } from '@/lib/auth'
import { loginSchema, type LoginInput } from '@/lib/validations'
import { CyberButton } from '@/components/ui/cyber-button'
import { CyberInput } from '@/components/ui/cyber-input'
import CyberBackground from '@/components/ui/CyberBackground'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const { setUser } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })

  const watchedEmail = watch('email')
  const watchedPassword = watch('password')

  const onSubmit = async (data: LoginInput) => {
    try {
      console.log('🔐 Attempting login with:', { email: data.email })

      const { user, session } = await signIn(data.email, data.password)
      console.log('✅ Login successful:', { user, session })

      setUser(user)

      // Success toast with cyberpunk styling
      toast.success('Access Granted! Welcome to the Cyber Defense Network', {
        style: {
          background: 'rgba(10, 10, 35, 0.9)',
          border: '1px solid #00FF41',
          color: '#E0E0E0',
          boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)'
        }
      })

      console.log('🚀 Redirecting to dashboard...')
      router.push('/dashboard')
    } catch (error: any) {
      console.error('❌ Login failed:', error)

      // Error toast with glitch effect
      toast.error(error.message || 'Access Denied - Authentication Failed', {
        style: {
          background: 'rgba(10, 10, 35, 0.9)',
          border: '1px solid #FF073A',
          color: '#E0E0E0',
          boxShadow: '0 0 20px rgba(255, 7, 58, 0.3)'
        }
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cyber-dark">
      {/* Cyberpunk Background */}
      <CyberBackground variant="grid" intensity="medium" />

      {/* Main Content */}
      <motion.div
        className="w-full max-w-md px-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Glassmorphism Card */}
        <motion.div
          className="glass-cyber-dark p-8 rounded-xl relative overflow-hidden"
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
                boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)'
              }}
              transition={{ duration: 0.3 }}
            >
              <Shield className="h-10 w-10 text-cyber-dark transform rotate-12" />
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
              CYBER ACCESS
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
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <CyberInput
                {...register('email')}
                type="email"
                label="Email Address"
                placeholder="Enter your neural network ID"
                icon={<Mail className="h-5 w-5" />}
                error={errors.email?.message}
                glowColor="blue"
                animatedLabel
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <CyberInput
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                label="Access Code"
                placeholder="Enter your security passphrase"
                icon={<Lock className="h-5 w-5" />}
                rightIcon={
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-cyber-white/50 hover:text-cyber-blue transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </motion.button>
                }
                error={errors.password?.message}
                glowColor="purple"
                animatedLabel
              />
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex items-center">
                <motion.input
                  {...register('rememberMe')}
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-cyber-blue focus:ring-cyber-blue/20 border-cyber-blue/30 rounded bg-transparent"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
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
              <CyberButton
                type="submit"
                variant="primary"
                size="lg"
                glow="blue"
                loading={isSubmitting}
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'ACCESSING NETWORK...' : 'INITIATE ACCESS'}
              </CyberButton>
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
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
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
              className="glass-cyber-dark p-6 rounded-xl max-w-md w-full mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gradient-cyber mb-4">Reset Access Code</h3>
              <p className="text-cyber-white/70 mb-4">
                Enter your neural network ID to receive reset instructions.
              </p>
              <CyberInput
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                icon={<Mail className="h-5 w-5" />}
                glowColor="blue"
              />
              <div className="flex gap-3 mt-6">
                <CyberButton
                  variant="outline"
                  onClick={() => setShowForgotPassword(false)}
                  className="flex-1"
                >
                  Cancel
                </CyberButton>
                <CyberButton
                  variant="primary"
                  className="flex-1"
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
                </CyberButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
