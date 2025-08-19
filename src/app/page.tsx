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
        <nav className="relative z-50 p-6">
          <div className="container mx-auto flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient-cyber">CYBER DEFENSE NETWORK</span>
            </motion.div>

            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center space-x-4">
                {!user && (
                  <>
                    <Link href="/auth/login">
                      <CyberButton variant="secondary">
                        <LockClosedIcon className="w-4 h-4 mr-2" />
                        Sign In
                      </CyberButton>
                    </Link>
                    <Link href="/auth/register">
                      <CyberButton variant="primary">
                        <BoltIcon className="w-4 h-4 mr-2" />
                        Get Started
                      </CyberButton>
                    </Link>
                  </>
                )}
                {user && (
                  <Link href="/dashboard">
                    <CyberButton variant="primary">
                      <ShieldCheckIcon className="w-4 h-4 mr-2" />
                      Command Center
                    </CyberButton>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-6"
              >
                <span className="inline-flex items-center px-4 py-2 bg-cyber-blue/20 border border-cyber-blue/30 rounded-full text-cyber-blue text-sm font-medium animate-pulse">
                  <BoltIcon className="w-4 h-4 mr-2" />
                  Next-Gen Security Training
                </span>
              </motion.div>

              <motion.h1
                className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span className="text-gradient-cyber">Defend the</span>
                <br />
                <span className="text-cyber-white">Digital Frontier</span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl mb-12 text-cyber-white/70 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Master cybersecurity with immersive neural training modules, realistic phishing simulations,
                and comprehensive threat awareness protocols. Protect your organization with cutting-edge security education.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <Link href="/auth/register">
                  <CyberButton variant="primary" size="lg" className="px-8 py-4 text-lg flex items-center space-x-2">
                    <span>Start Neural Training</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </CyberButton>
                </Link>

                <CyberButton variant="ghost" size="lg" className="px-8 py-4 text-lg flex items-center space-x-2">
                  <PlayIcon className="w-5 h-5" />
                  <span>Watch Demo</span>
                </CyberButton>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <GlassCard variant="cyber" glow className="text-center p-6">
                  <div className="text-3xl font-bold text-cyber-blue mb-2">10,000+</div>
                  <p className="text-sm text-cyber-white/70">Neural Agents Trained</p>
                </GlassCard>

                <GlassCard variant="cyber" glow className="text-center p-6">
                  <div className="text-3xl font-bold text-cyber-green mb-2">95%</div>
                  <p className="text-sm text-cyber-white/70">Threat Detection Rate</p>
                </GlassCard>

                <GlassCard variant="cyber" glow className="text-center p-6">
                  <div className="text-3xl font-bold text-cyber-purple mb-2">500+</div>
                  <p className="text-sm text-cyber-white/70">Networks Protected</p>
                </GlassCard>
              </motion.div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-cyber-blue/20 rounded-full blur-xl"
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
            className="absolute bottom-20 right-10 w-32 h-32 bg-cyber-purple/20 rounded-full blur-xl"
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
        <section className="relative z-10 py-32 px-6">
          <div className="container mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center px-4 py-2 bg-cyber-purple/20 border border-cyber-purple/30 rounded-full text-cyber-purple text-sm font-medium mb-6">
                <ShieldCheckIcon className="w-4 h-4 mr-2" />
                Comprehensive Defense Suite
              </span>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-gradient-cyber">Advanced Neural</span>
                <br />
                <span className="text-cyber-white">Security Training</span>
              </h2>
              <p className="text-xl text-cyber-white/70 max-w-4xl mx-auto leading-relaxed">
                Our platform provides everything you need to build an impenetrable cybersecurity
                defense network with cutting-edge neural technology and proven methodologies.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
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
                  <GlassCard variant="cyber" glow className="p-8 h-full group hover:border-cyber-blue/50 transition-all duration-300">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-cyber-blue to-cyber-purple flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-4 text-cyber-white group-hover:text-gradient-cyber transition-all duration-300 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-cyber-white/70 leading-relaxed text-center">
                      {feature.description}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Feature Highlight */}
            <motion.div
              className="grid md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <span className="inline-flex items-center px-4 py-2 bg-cyber-green/20 border border-cyber-green/30 rounded-full text-cyber-green text-sm font-medium mb-6">
                  <LockClosedIcon className="w-4 h-4 mr-2" />
                  Advanced Threat Detection
                </span>
                <h3 className="text-4xl font-bold mb-6 text-cyber-white">
                  AI-Powered Neural Intelligence
                </h3>
                <p className="text-lg text-cyber-white/70 mb-8 leading-relaxed">
                  Our platform uses advanced neural networks and quantum computing to analyze behavioral patterns,
                  predict cyber threats, and provide personalized defense protocols to maximize security effectiveness.
                </p>
                <div className="space-y-4">
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
                      <CheckCircleIcon className="w-5 h-5 text-cyber-blue" />
                      <span className="text-cyber-white">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

                <div className="relative">
                <GlassCard variant="cyber" glow className="p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyber-green mb-2">94%</div>
                      <p className="text-sm text-cyber-white/70">Security Score</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyber-red mb-2">1,247</div>
                      <p className="text-sm text-cyber-white/70">Threats Blocked</p>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-cyber-blue/20">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-cyber-white/70">Neural Network Status</span>
                      <span className="text-cyber-green">ACTIVE</span>
                    </div>
                  </div>
                </GlassCard>

                {/* Floating indicators */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-cyber-blue rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <EyeIcon className="w-4 h-4 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 py-32 px-6">
          <div className="container mx-auto">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
                <GlassCard variant="cyber" glow className="p-16 text-center relative overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="inline-flex items-center px-4 py-2 bg-cyber-pink/20 border border-cyber-pink/30 rounded-full text-cyber-pink text-sm font-medium mb-8">
                    <ShieldCheckIcon className="w-4 h-4 mr-2" />
                    Ready to Join the Defense Network?
                  </span>

                  <h2 className="text-5xl md:text-6xl font-bold mb-8">
                    <span className="text-gradient-cyber">Strengthen Your</span>
                    <br />
                    <span className="text-cyber-white">Cyber Defense Today</span>
                  </h2>

                  <p className="text-xl text-cyber-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Join thousands of organizations who have fortified their digital infrastructure
                    and neutralized cyber threats with our advanced neural training platform.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link href="/auth/register">
                      <button className="btn-cyber-primary px-8 py-4 text-lg flex items-center space-x-2">
                        <span>Initialize Neural Training</span>
                        <ArrowRightIcon className="w-5 h-5" />
                      </button>
                    </Link>

                    <Link href="/contact">
                      <button className="glass-cyber px-8 py-4 text-lg border border-cyber-blue/30 hover:border-cyber-blue/50 transition-all duration-300">
                        Contact Command Center
                      </button>
                    </Link>
                  </div>

                  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                    <div className="text-center">
                      <CheckCircleIcon className="w-6 h-6 text-cyber-blue mx-auto mb-2" />
                      <span className="text-sm text-cyber-white/70">30-day neural trial</span>
                    </div>
                    <div className="text-center">
                      <CheckCircleIcon className="w-6 h-6 text-cyber-blue mx-auto mb-2" />
                      <span className="text-sm text-cyber-white/70">No quantum credits required</span>
                    </div>
                    <div className="text-center">
                      <CheckCircleIcon className="w-6 h-6 text-cyber-blue mx-auto mb-2" />
                      <span className="text-sm text-cyber-white/70">24/7 neural support</span>
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
        <footer className="relative z-10 border-t border-cyber-blue/30 py-16 px-6">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center">
                    <ShieldCheckIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gradient-cyber">CYBER DEFENSE</span>
                </div>
                <p className="text-cyber-white/70 mb-6 leading-relaxed">
                  Advanced neural cybersecurity training platform designed to protect digital infrastructures
                  from evolving quantum threats through comprehensive neural education and simulation.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6 text-cyber-white">Neural Platform</h3>
                <ul className="space-y-3">
                  <li><Link href="/training" className="text-cyber-white/70 hover:text-cyber-blue transition-colors">Training Modules</Link></li>
                  <li><Link href="/simulations" className="text-cyber-white/70 hover:text-cyber-blue transition-colors">Phishing Matrix</Link></li>
                  <li><Link href="/analytics" className="text-cyber-white/70 hover:text-cyber-blue transition-colors">Quantum Analytics</Link></li>
                  <li><Link href="/admin" className="text-cyber-white/70 hover:text-cyber-blue transition-colors">Command Center</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6 text-cyber-white">Neural Resources</h3>
                <ul className="space-y-3">
                  <li><Link href="/docs" className="text-cyber-white/70 hover:text-cyber-blue transition-colors">Documentation</Link></li>
                  <li><Link href="/support" className="text-cyber-white/70 hover:text-cyber-blue transition-colors">Support Network</Link></li>
                  <li><Link href="/blog" className="text-cyber-white/70 hover:text-cyber-blue transition-colors">Threat Intelligence</Link></li>
                  <li><Link href="/api" className="text-cyber-white/70 hover:text-cyber-blue transition-colors">Neural API</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6 text-cyber-white">Network</h3>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-cyber-white/70 hover:text-cyber-blue transition-colors">About Network</Link></li>
                  <li><Link href="/contact" className="text-cyber-white/70 hover:text-cyber-blue transition-colors">Contact Command</Link></li>
                  <li><Link href="/privacy" className="text-cyber-white/70 hover:text-cyber-blue transition-colors">Privacy Protocol</Link></li>
                  <li><Link href="/terms" className="text-cyber-white/70 hover:text-cyber-blue transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-cyber-blue/30 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-cyber-white/70 text-sm">
                &copy; 2024 CYBER DEFENSE NETWORK. All rights reserved. | Neural Project by Leslie Benson Achi
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 bg-cyber-green/20 border border-cyber-green/30 rounded-full text-cyber-green text-xs font-medium animate-pulse">
                  <LockClosedIcon className="w-3 h-3 mr-1" />
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