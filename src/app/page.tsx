'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ShieldCheckIcon, 
  UsersIcon, 
  ChartBarIcon, 
  EnvelopeIcon, 
  BookOpenIcon, 
  BoltIcon,
  ArrowRightIcon,
  PlayIcon,
  CheckCircleIcon,
  EyeIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline'
import Layout from '@/components/layout/Layout'
import { GlassCard } from '@/components/ui/GlassCard'
import { useAuth } from '@/hooks/useAuth'
import { CyberButton } from '@/components/ui/cyber-button'

export default function HomePage() {
  const { user } = useAuth()
  return (
    <Layout showNavbar={false} showParticles={true}>
      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="relative z-50 p-4 sm:p-6">
          <div className="container mx-auto flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-2xl font-bold text-gradient-cyber">CYBER DEFENSE NETWORK</span>
            </motion.div>

            <motion.div
              className="flex items-center space-x-2 sm:space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center space-x-2 sm:space-x-4">
                {!user && (
                  <>
                    <Link href="/auth/login">
                      <CyberButton variant="secondary" className="text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2">
                        <LockClosedIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Sign In
                      </CyberButton>
                    </Link>
                    <Link href="/auth/register">
                      <CyberButton variant="primary" className="text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2">
                        <BoltIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Get Started
                      </CyberButton>
                    </Link>
                  </>
                )}
                {user && (
                  <Link href="/dashboard">
                    <CyberButton variant="primary" className="text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2">
                      <ShieldCheckIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Command Center
                    </CyberButton>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-4 sm:mb-6"
              >
                <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-cyber-blue/20 border border-cyber-blue/30 rounded-full text-cyber-blue text-xs sm:text-sm font-medium animate-pulse">
                  <BoltIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Next-Gen Security Training
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span className="text-gradient-cyber">Defend the</span>
                <br />
                <span className="text-cyber-white">Digital Frontier</span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-cyber-white/70 max-w-4xl mx-auto leading-relaxed px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Master cybersecurity with immersive neural training modules, realistic phishing simulations,
                and comprehensive threat awareness protocols. Protect your organization with cutting-edge security education.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                {!user ? (
                  <>
                    <Link href="/auth/register">
                      <CyberButton variant="primary" size="lg" className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg flex items-center justify-center space-x-2">
                        <span>Start Neural Training</span>
                        <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </CyberButton>
                    </Link>
                    <Link href="/auth/login">
                      <CyberButton variant="secondary" size="lg" className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg flex items-center justify-center space-x-2">
                        <LockClosedIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Sign In</span>
                      </CyberButton>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard">
                      <CyberButton variant="primary" size="lg" className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg flex items-center justify-center space-x-2">
                        <span>Enter Command Center</span>
                        <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </CyberButton>
                    </Link>
                    <Link href="/training">
                      <CyberButton variant="ghost" size="lg" className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg flex items-center justify-center space-x-2">
                        <PlayIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Open Training Matrix</span>
                      </CyberButton>
                    </Link>
                  </>
                )}
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <GlassCard variant="cyber" glow className="text-center p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl font-bold text-cyber-blue mb-2">10,000+</div>
                  <p className="text-xs sm:text-sm text-cyber-white/70">Neural Agents Trained</p>
                </GlassCard>

                <GlassCard variant="cyber" glow className="text-center p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl font-bold text-cyber-green mb-2">95%</div>
                  <p className="text-xs sm:text-sm text-cyber-white/70">Threat Detection Rate</p>
                </GlassCard>

                <GlassCard variant="cyber" glow className="text-center p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl font-bold text-cyber-purple mb-2">500+</div>
                  <p className="text-xs sm:text-sm text-cyber-white/70">Networks Protected</p>
                </GlassCard>
              </motion.div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-cyber-blue/20 rounded-full blur-xl"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-20 right-4 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 bg-cyber-purple/20 rounded-full blur-xl"
            animate={{
              y: [0, 20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </section>

        {/* Features Section */}
        <section className="relative z-10 py-16 sm:py-32 px-4 sm:px-6">
          <div className="container mx-auto">
            <motion.div
              className="text-center mb-12 sm:mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-cyber-purple/20 border border-cyber-purple/30 rounded-full text-cyber-purple text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <ShieldCheckIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Comprehensive Defense Suite
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                <span className="text-gradient-cyber">Advanced Neural</span>
                <br />
                <span className="text-cyber-white">Security Training</span>
              </h2>
              <p className="text-lg sm:text-xl text-cyber-white/70 max-w-4xl mx-auto leading-relaxed px-4">
                Our platform provides everything you need to build an impenetrable cybersecurity
                defense network with cutting-edge neural technology and proven methodologies.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
              {[
                {
                  icon: BookOpenIcon,
                  title: "Neural Training Modules",
                  description: "Immersive modules covering advanced threat detection, neural pattern recognition, and quantum encryption protocols.",
                  delay: 0.1
                },
                {
                  icon: EnvelopeIcon,
                  title: "Phishing Simulation Matrix",
                  description: "Hyper-realistic phishing simulations using AI-generated threats to test and enhance neural response patterns.",
                  delay: 0.2
                },
                {
                  icon: ChartBarIcon,
                  title: "Quantum Analytics",
                  description: "Real-time threat intelligence with quantum-powered analytics to predict and prevent cyber attacks before they happen.",
                  delay: 0.3
                },
                {
                  icon: UsersIcon,
                  title: "Neural Network Management",
                  description: "Advanced user management with neural role assignment and adaptive security clearance protocols.",
                  delay: 0.4
                },
                {
                  icon: ShieldCheckIcon,
                  title: "Quantum Security",
                  description: "Military-grade security with quantum encryption, neural authentication, and zero-trust architecture.",
                  delay: 0.5
                },
                {
                  icon: BoltIcon,
                  title: "Gamified Defense",
                  description: "Earn neural badges and quantum points for mastering defense protocols and neutralizing cyber threats.",
                  delay: 0.6
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: feature.delay }}
                  viewport={{ once: true }}
                >
                  <GlassCard variant="cyber" glow className="p-6 sm:p-8 h-full group hover:border-cyber-blue/50 transition-all duration-300">
                    <motion.div
                      className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r from-cyber-blue to-cyber-purple flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-cyber-white group-hover:text-gradient-cyber transition-all duration-300 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-cyber-white/70 leading-relaxed text-center">
                      {feature.description}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Feature Highlight */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="order-2 md:order-1">
                <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-cyber-green/20 border border-cyber-green/30 rounded-full text-cyber-green text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                  <LockClosedIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Advanced Threat Detection
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-cyber-white">
                  AI-Powered Neural Intelligence
                </h3>
                <p className="text-base sm:text-lg text-cyber-white/70 mb-6 sm:mb-8 leading-relaxed">
                  Our platform uses advanced neural networks and quantum computing to analyze behavioral patterns,
                  predict cyber threats, and provide personalized defense protocols to maximize security effectiveness.
                </p>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    "Real-time quantum threat intelligence",
                    "Neural behavioral analysis and risk scoring",
                    "Personalized defense learning paths",
                    "Automated compliance and reporting"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-cyber-blue flex-shrink-0" />
                      <span className="text-sm sm:text-base text-cyber-white">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative order-1 md:order-2">
                <GlassCard variant="cyber" glow className="p-6 sm:p-8">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-cyber-green mb-2">94%</div>
                      <p className="text-xs sm:text-sm text-cyber-white/70">Security Score</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-cyber-red mb-2">1,247</div>
                      <p className="text-xs sm:text-sm text-cyber-white/70">Threats Blocked</p>
                    </div>
                  </div>
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-cyber-blue/20">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-cyber-white/70">Neural Network Status</span>
                      <span className="text-cyber-green">ACTIVE</span>
                    </div>
                  </div>
                </GlassCard>

                {/* Floating indicators */}
                <motion.div
                  className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-cyber-blue rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <EyeIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 py-16 sm:py-32 px-4 sm:px-6">
          <div className="container mx-auto">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <GlassCard variant="cyber" glow className="p-8 sm:p-16 text-center relative overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-cyber-pink/20 border border-cyber-pink/30 rounded-full text-cyber-pink text-xs sm:text-sm font-medium mb-6 sm:mb-8">
                    <ShieldCheckIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Ready to Join the Defense Network?
                  </span>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
                    <span className="text-gradient-cyber">Strengthen Your</span>
                    <br />
                    <span className="text-cyber-white">Cyber Defense Today</span>
                  </h2>

                  <p className="text-lg sm:text-xl text-cyber-white/70 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                    Join thousands of organizations who have fortified their digital infrastructure
                    and neutralized cyber threats with our advanced neural training platform.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                    {!user ? (
                      <>
                        <Link href="/auth/register">
                          <CyberButton variant="primary" size="lg" className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg flex items-center justify-center space-x-2">
                            <span>Initialize Neural Training</span>
                            <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </CyberButton>
                        </Link>
                        <Link href="/auth/login">
                          <CyberButton variant="secondary" size="lg" className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg flex items-center justify-center space-x-2">
                            <LockClosedIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Sign In</span>
                          </CyberButton>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link href="/dashboard">
                          <CyberButton variant="primary" size="lg" className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg flex items-center justify-center space-x-2">
                            <span>Go to Command Center</span>
                            <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </CyberButton>
                        </Link>
                        <Link href="/training">
                          <CyberButton variant="secondary" size="lg" className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg flex items-center justify-center space-x-2">
                            <PlayIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Continue Training</span>
                          </CyberButton>
                        </Link>
                      </>
                    )}
                  </div>

                  <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
                    <div className="text-center">
                      <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-cyber-blue mx-auto mb-2" />
                      <span className="text-xs sm:text-sm text-cyber-white/70">30-day neural trial</span>
                    </div>
                    <div className="text-center">
                      <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-cyber-blue mx-auto mb-2" />
                      <span className="text-xs sm:text-sm text-cyber-white/70">No quantum credits required</span>
                    </div>
                    <div className="text-center">
                      <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-cyber-blue mx-auto mb-2" />
                      <span className="text-xs sm:text-sm text-cyber-white/70">24/7 neural support</span>
                    </div>
                  </div>
                </motion.div>
              </GlassCard>

              {/* Background effects */}
              <div className="absolute inset-0 cyber-grid-bg opacity-10 rounded-lg" />
              <div className="absolute inset-0 floating-particles rounded-lg" />
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-cyber-blue/30 py-12 sm:py-16 px-4 sm:px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div className="sm:col-span-2 md:col-span-1">
                <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center">
                    <ShieldCheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-gradient-cyber">CYBER DEFENSE</span>
                </div>
                <p className="text-sm sm:text-base text-cyber-white/70 mb-4 sm:mb-6 leading-relaxed">
                  Advanced neural cybersecurity training platform designed to protect digital infrastructures
                  from evolving quantum threats through comprehensive neural education and simulation.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-cyber-white">Neural Platform</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li><Link href="/training" className="text-sm sm:text-base text-cyber-white/70 hover:text-cyber-blue transition-colors">Training Modules</Link></li>
                  <li><Link href="/simulations" className="text-sm sm:text-base text-cyber-white/70 hover:text-cyber-blue transition-colors">Phishing Matrix</Link></li>
                  <li><Link href="/analytics" className="text-sm sm:text-base text-cyber-white/70 hover:text-cyber-blue transition-colors">Quantum Analytics</Link></li>
                  <li><Link href="/admin" className="text-sm sm:text-base text-cyber-white/70 hover:text-cyber-blue transition-colors">Command Center</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-cyber-white">Neural Resources</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li><Link href="/docs" className="text-sm sm:text-base text-cyber-white/70 hover:text-cyber-blue transition-colors">Documentation</Link></li>
                  <li><Link href="/support" className="text-sm sm:text-base text-cyber-white/70 hover:text-cyber-blue transition-colors">Support Network</Link></li>
                  <li><Link href="/blog" className="text-sm sm:text-base text-cyber-white/70 hover:text-cyber-blue transition-colors">Threat Intelligence</Link></li>
                  <li><Link href="/api" className="text-sm sm:text-base text-cyber-white/70 hover:text-cyber-blue transition-colors">Neural API</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-cyber-white">Network</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li><Link href="/about" className="text-sm sm:text-base text-cyber-white/70 hover:text-cyber-blue transition-colors">About Network</Link></li>
                  <li><Link href="/contact" className="text-sm sm:text-base text-cyber-white/70 hover:text-cyber-blue transition-colors">Contact Command</Link></li>
                  <li><Link href="/privacy" className="text-sm sm:text-base text-cyber-white/70 hover:text-cyber-blue transition-colors">Privacy Protocol</Link></li>
                  <li><Link href="/terms" className="text-sm sm:text-base text-cyber-white/70 hover:text-cyber-blue transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-cyber-blue/30 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-xs sm:text-sm text-cyber-white/70 text-center sm:text-left">
                &copy; 2024 CYBER DEFENSE NETWORK. All rights reserved. | Neural Project by Leslie Benson Achi
              </p>
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 bg-cyber-green/20 border border-cyber-green/30 rounded-full text-cyber-green text-xs font-medium animate-pulse">
                  <LockClosedIcon className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                  SECURE NETWORK
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  )
}