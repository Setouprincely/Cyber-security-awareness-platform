'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, Users, BarChart3, Mail, BookOpen, Target, Lock, Eye, Zap, ArrowRight, Play, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { CyberParticles } from '@/components/ui/CyberParticles'
import { AnimatedCounter, SecurityScore, ThreatCounter } from '@/components/ui/AnimatedCounter'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Badge } from '@/components/ui/Badge'

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <CyberParticles variant="cyber" density={60} speed={0.5} />
      </div>

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
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">CyberGuard Pro</span>
          </motion.div>

          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ThemeToggle variant="switch" />
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="cyber">Get Started</Button>
            </Link>
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
            >
              <Badge variant="cyber" className="mb-6" animation="pulse">
                <Zap className="w-4 h-4 mr-2" />
                Next-Gen Security Training
              </Badge>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="text-gradient">Stay Secure</span>
              <br />
              <span className="text-foreground">in a Digital World</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Master cybersecurity with interactive training modules, realistic phishing simulations,
              and comprehensive threat awareness programs. Protect your organization with cutting-edge security education.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Link href="/auth/register">
                <Button
                  variant="cyber"
                  size="xl"
                  animation="glow"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Start Training Now
                </Button>
              </Link>

              <Button
                variant="glass"
                size="xl"
                icon={<Play className="w-5 h-5" />}
                className="group"
              >
                <span>Watch Demo</span>
                <motion.div
                  className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <GlassCard variant="cyber" className="text-center p-6">
                <AnimatedCounter value={10000} suffix="+" variant="cyber" size="lg" glow />
                <p className="text-sm text-muted-foreground mt-2">Users Trained</p>
              </GlassCard>

              <GlassCard variant="cyber" className="text-center p-6">
                <AnimatedCounter value={95} suffix="%" variant="neon" size="lg" glow />
                <p className="text-sm text-muted-foreground mt-2">Threat Detection Rate</p>
              </GlassCard>

              <GlassCard variant="cyber" className="text-center p-6">
                <AnimatedCounter value={500} suffix="+" variant="gradient" size="lg" glow />
                <p className="text-sm text-muted-foreground mt-2">Organizations Protected</p>
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
            <Badge variant="gradient" className="mb-6">
              <Target className="w-4 h-4 mr-2" />
              Comprehensive Training Suite
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Advanced Security</span>
              <br />
              <span className="text-foreground">Training Platform</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Our platform provides everything you need to build a strong cybersecurity
              awareness culture in your organization with cutting-edge technology and proven methodologies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: BookOpen,
                title: "Interactive Training",
                description: "Engaging modules covering phishing, password security, social engineering, and data protection with interactive quizzes and real-world scenarios.",
                color: "cyber",
                delay: 0.1
              },
              {
                icon: Mail,
                title: "Phishing Simulation",
                description: "Realistic phishing email simulations to test and improve users' ability to identify and respond to sophisticated threats.",
                color: "neon",
                delay: 0.2
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                description: "Comprehensive analytics and reporting to track progress, identify vulnerabilities, and measure training effectiveness with AI insights.",
                color: "gradient",
                delay: 0.3
              },
              {
                icon: Users,
                title: "User Management",
                description: "Role-based access control with separate interfaces for trainees and administrators to manage the platform effectively.",
                color: "cyber",
                delay: 0.4
              },
              {
                icon: Shield,
                title: "Security First",
                description: "Built with security best practices including HTTPS, input sanitization, rate limiting, and secure authentication protocols.",
                color: "neon",
                delay: 0.5
              },
              {
                icon: Target,
                title: "Gamification",
                description: "Earn badges and points for completing modules and successfully identifying phishing attempts to boost engagement and retention.",
                color: "gradient",
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
                <GlassCard
                  variant={feature.color as any}
                  className="text-center h-full group"
                  interactive
                  glow
                >
                  <motion.div
                    className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-cyber-blue to-cyber-purple flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-gradient transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyber-blue/5 to-cyber-purple/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
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
              <Badge variant="cyber" className="mb-6" animation="pulse">
                <Lock className="w-4 h-4 mr-2" />
                Advanced Threat Detection
              </Badge>
              <h3 className="text-4xl font-bold mb-6 text-foreground">
                AI-Powered Security Intelligence
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our platform uses advanced machine learning algorithms to analyze user behavior,
                identify potential security risks, and provide personalized training recommendations
                to maximize learning effectiveness.
              </p>
              <div className="space-y-4">
                {[
                  "Real-time threat intelligence updates",
                  "Behavioral analysis and risk scoring",
                  "Personalized learning paths",
                  "Automated compliance reporting"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="w-5 h-5 text-cyber-blue" />
                    <span className="text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <GlassCard variant="cyber" className="p-8" glow>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <SecurityScore score={94} />
                  </div>
                  <div className="text-center">
                    <ThreatCounter threats={1247} />
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-cyber-blue/20">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span className="text-cyber-blue">2 minutes ago</span>
                  </div>
                </div>
              </GlassCard>

              {/* Floating indicators */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-cyber-blue rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Eye className="w-4 h-4 text-white" />
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
            <GlassCard variant="cyber" className="text-center p-16" glow>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Badge variant="neon" className="mb-8" animation="glow">
                  <Shield className="w-4 h-4 mr-2" />
                  Ready to Get Started?
                </Badge>

                <h2 className="text-5xl md:text-6xl font-bold mb-8">
                  <span className="text-gradient">Strengthen Your</span>
                  <br />
                  <span className="text-foreground">Cybersecurity Today</span>
                </h2>

                <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of organizations who have improved their cybersecurity posture
                  and reduced their risk of cyber attacks with our comprehensive training platform.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Link href="/auth/register">
                    <Button
                      variant="cyber"
                      size="xl"
                      animation="glow"
                      icon={<ArrowRight className="w-5 h-5" />}
                      iconPosition="right"
                    >
                      Start Your Training Today
                    </Button>
                  </Link>

                  <Link href="/contact">
                    <Button
                      variant="outline"
                      size="xl"
                    >
                      Contact Sales
                    </Button>
                  </Link>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                  <div className="text-center">
                    <CheckCircle className="w-6 h-6 text-cyber-blue mx-auto mb-2" />
                    <span className="text-sm text-muted-foreground">Free 30-day trial</span>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="w-6 h-6 text-cyber-blue mx-auto mb-2" />
                    <span className="text-sm text-muted-foreground">No credit card required</span>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="w-6 h-6 text-cyber-blue mx-auto mb-2" />
                    <span className="text-sm text-muted-foreground">24/7 support included</span>
                  </div>
                </div>
              </motion.div>

              {/* Background effects */}
              <div className="absolute inset-0 cyber-grid-bg opacity-10 rounded-xl" />
              <div className="absolute inset-0 floating-particles rounded-xl" />
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">CyberGuard Pro</span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Advanced cybersecurity training platform designed to protect organizations
                from evolving cyber threats through comprehensive education and simulation.
              </p>
              <div className="flex space-x-4">
                {/* Social links would go here */}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-foreground">Platform</h3>
              <ul className="space-y-3">
                <li><Link href="/training" className="text-muted-foreground hover:text-cyber-blue transition-colors">Training Modules</Link></li>
                <li><Link href="/simulations" className="text-muted-foreground hover:text-cyber-blue transition-colors">Phishing Simulations</Link></li>
                <li><Link href="/analytics" className="text-muted-foreground hover:text-cyber-blue transition-colors">Analytics Dashboard</Link></li>
                <li><Link href="/admin" className="text-muted-foreground hover:text-cyber-blue transition-colors">Admin Panel</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-foreground">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="/docs" className="text-muted-foreground hover:text-cyber-blue transition-colors">Documentation</Link></li>
                <li><Link href="/support" className="text-muted-foreground hover:text-cyber-blue transition-colors">Support Center</Link></li>
                <li><Link href="/blog" className="text-muted-foreground hover:text-cyber-blue transition-colors">Security Blog</Link></li>
                <li><Link href="/api" className="text-muted-foreground hover:text-cyber-blue transition-colors">API Reference</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-foreground">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-muted-foreground hover:text-cyber-blue transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-cyber-blue transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="text-muted-foreground hover:text-cyber-blue transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-muted-foreground hover:text-cyber-blue transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              &copy; 2024 CyberGuard Pro. All rights reserved. | Final Year Project by Leslie Benson Achi
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Badge variant="cyber" animation="pulse">
                <Lock className="w-3 h-3 mr-1" />
                Secure Platform
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
