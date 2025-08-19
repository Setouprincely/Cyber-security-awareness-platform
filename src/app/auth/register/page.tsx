'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Shield, Mail, Lock, User, ArrowLeft, ArrowRight, CheckCircle, Users } from 'lucide-react'
import { toast } from 'sonner'
import Confetti from 'react-confetti'
import { useAuth } from '@/hooks/useAuth'
import { signUp } from '@/lib/auth'
import {
  registrationStep1Schema,
  registrationStep2Schema,
  type RegistrationStep1Data,
  type RegistrationStep2Data,
  UserRole,
  type UserRoleType
} from '@/lib/validations'
import { CyberButton } from '@/components/ui/cyber-button'
import { CyberInput } from '@/components/ui/cyber-input'
import CyberBackground from '@/components/ui/CyberBackground'

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { setUser } = useAuth()
  const router = useRouter()

  // Step 1 form
  const step1Form = useForm<RegistrationStep1Data>({
    resolver: zodResolver(registrationStep1Schema),
    defaultValues: {
      name: '',
      email: ''
    }
  })

  // Step 2 form
  const step2Form = useForm<RegistrationStep2Data>({
    resolver: zodResolver(registrationStep2Schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      role: 'TRAINEE',
      terms: false
    }
  })

  const onStep1Submit = (data: RegistrationStep1Data) => {
    setCurrentStep(2)
  }

  const onStep2Submit = async (data: RegistrationStep2Data) => {
    try {
      const step1Data = step1Form.getValues()
      console.log('🔐 Starting registration process...')
      
      const { user } = await signUp(step1Data.email, data.password, step1Data.name, data.role as any)

      if (user) {
        console.log('✅ Registration successful, user created:', user.id)
        
        // Show confetti and success message
        setShowConfetti(true)
        toast.success('Neural Network Access Granted! Welcome to the Cyber Defense Network', {
          style: {
            background: 'rgba(10, 10, 35, 0.9)',
            border: '1px solid #00FF41',
            color: '#E0E0E0',
            boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)'
          }
        })

        // Wait a moment for the user to see the success message, then redirect to login
        setTimeout(() => {
          setShowConfetti(false)
          toast.success('Please log in with your new account to access the dashboard', {
            style: {
              background: 'rgba(10, 10, 35, 0.9)',
              border: '1px solid #00D4FF',
              color: '#E0E0E0',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)'
            }
          })
          router.push('/auth/login')
        }, 3000)
      }
    } catch (error: any) {
      console.error('❌ Registration failed:', error)
      toast.error(error.message || 'Network Access Denied - Registration Failed', {
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
      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          colors={['#00D4FF', '#8B00FF', '#FF007A', '#00FF41']}
        />
      )}

      {/* Cyberpunk Background */}
      <CyberBackground variant="particles" intensity="medium" />

      {/* Main Content */}
      <motion.div
        className="w-full max-w-lg px-4 relative z-10"
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
              className="mx-auto h-20 w-20 bg-gradient-to-br from-cyber-purple to-cyber-pink rounded-2xl flex items-center justify-center transform -rotate-12 shadow-xl mb-6 relative"
              whileHover={{
                rotate: -6,
                scale: 1.05,
                boxShadow: '0 0 30px rgba(139, 0, 255, 0.5)'
              }}
              transition={{ duration: 0.3 }}
            >
              <Shield className="h-10 w-10 text-cyber-dark transform rotate-12" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyber-purple to-cyber-pink rounded-2xl opacity-0"
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
              NEURAL REGISTRATION
            </motion.h2>

            <motion.p
              className="text-cyber-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Join the Cyber Defense Network
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-cyber-white/60">Step {currentStep} of 2</span>
              <span className="text-sm text-cyber-blue">{currentStep === 1 ? 'Identity' : 'Security'}</span>
            </div>
            <div className="w-full bg-cyber-dark/50 rounded-full h-2 border border-cyber-blue/30">
              <motion.div
                className="bg-gradient-to-r from-cyber-blue to-cyber-purple h-2 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: currentStep === 1 ? '50%' : '100%' }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Multi-Step Form */}
          <AnimatePresence mode="wait">
            {currentStep === 1 ? (
              <motion.form
                key="step1"
                className="space-y-6"
                onSubmit={step1Form.handleSubmit(onStep1Submit)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <CyberInput
                    {...step1Form.register('name')}
                    type="text"
                    placeholder="Enter your designation"
                    icon={<User className="h-5 w-5" />}
                    error={step1Form.formState.errors.name?.message}
                    glowColor="purple"
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <CyberInput
                    {...step1Form.register('email')}
                    type="email"
                    placeholder="Enter your neural network ID"
                    icon={<Mail className="h-5 w-5" />}
                    error={step1Form.formState.errors.email?.message}
                    glowColor="blue"
                  />
                </motion.div>

                {/* Next Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <CyberButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    glow="purple"
                    className="w-full"
                    disabled={step1Form.formState.isSubmitting}
                  >
                    PROCEED TO SECURITY SETUP
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </CyberButton>
                </motion.div>
              </motion.form>
            ) : (
              <motion.form
                key="step2"
                className="space-y-6"
                onSubmit={step2Form.handleSubmit(onStep2Submit)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <CyberInput
                    {...step2Form.register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create your access code"
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
                    error={step2Form.formState.errors.password?.message}
                    glowColor="pink"
                  />
                </motion.div>

                {/* Confirm Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <CyberInput
                    {...step2Form.register('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Verify your access code"
                    icon={<Lock className="h-5 w-5" />}
                    rightIcon={
                      <motion.button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-cyber-white/50 hover:text-cyber-blue transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </motion.button>
                    }
                    error={step2Form.formState.errors.confirmPassword?.message}
                    glowColor="pink"
                  />
                </motion.div>

                {/* Role Selection */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <label className="block text-sm font-medium text-cyber-white/70 mb-3">
                    Network Access Level
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.label
                      className={`relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        step2Form.watch('role') === 'TRAINEE'
                          ? 'border-cyber-blue bg-cyber-blue/10'
                          : 'border-cyber-blue/30 hover:border-cyber-blue/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        {...step2Form.register('role')}
                        type="radio"
                        value="TRAINEE"
                        className="sr-only"
                      />
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-cyber-blue mr-3" />
                        <div>
                          <div className="text-sm font-medium text-cyber-white">Trainee</div>
                          <div className="text-xs text-cyber-white/60">Standard Access</div>
                        </div>
                      </div>
                    </motion.label>

                    <motion.label
                      className={`relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        step2Form.watch('role') === 'ADMIN'
                          ? 'border-cyber-purple bg-cyber-purple/10'
                          : 'border-cyber-purple/30 hover:border-cyber-purple/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        {...step2Form.register('role')}
                        type="radio"
                        value="ADMIN"
                        className="sr-only"
                      />
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-cyber-purple mr-3" />
                        <div>
                          <div className="text-sm font-medium text-cyber-white">Admin</div>
                          <div className="text-xs text-cyber-white/60">Full Access</div>
                        </div>
                      </div>
                    </motion.label>
                  </div>
                  {step2Form.formState.errors.role && (
                    <p className="mt-2 text-sm text-cyber-red">{step2Form.formState.errors.role.message}</p>
                  )}
                </motion.div>

                {/* Terms and Conditions */}
                <motion.div
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <motion.input
                    {...step2Form.register('terms')}
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-cyber-blue focus:ring-cyber-blue/20 border-cyber-blue/30 rounded bg-transparent mt-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                  <label htmlFor="terms" className="text-sm text-cyber-white/70">
                    I accept the{' '}
                    <Link href="/terms" className="text-cyber-blue hover:text-cyber-purple transition-colors">
                      Neural Network Protocols
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-cyber-blue hover:text-cyber-purple transition-colors">
                      Data Security Agreement
                    </Link>
                  </label>
                </motion.div>
                {step2Form.formState.errors.terms && (
                  <p className="text-sm text-cyber-red">{step2Form.formState.errors.terms.message}</p>
                )}

                {/* Form Actions */}
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  <CyberButton
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    BACK
                  </CyberButton>

                  <CyberButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    glow="green"
                    loading={step2Form.formState.isSubmitting}
                    className="flex-1"
                    disabled={step2Form.formState.isSubmitting}
                  >
                    {step2Form.formState.isSubmitting ? 'ESTABLISHING CONNECTION...' : 'JOIN NETWORK'}
                    <CheckCircle className="ml-2 h-5 w-5" />
                  </CyberButton>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Sign In Link */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <p className="text-sm text-cyber-white/60">
              Already have network access?{' '}
              <Link
                href="/auth/login"
                className="font-medium text-cyber-pink hover:text-cyber-blue transition-colors"
              >
                Access Terminal
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
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
    </div>
  )
}


