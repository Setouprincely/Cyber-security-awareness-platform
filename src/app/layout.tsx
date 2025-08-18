import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { ToastProvider } from '@/components/providers/ToastProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'CYBER DEFENSE NETWORK - Neural Security Training Platform',
  description: 'Advanced cybersecurity neural training with immersive phishing simulations, threat awareness protocols, and cyber defense mastery. Protect the digital frontier with cutting-edge security education.',
  keywords: ['cybersecurity', 'phishing simulation', 'security training', 'threat awareness', 'cyber defense', 'neural network', 'penetration testing', 'social engineering', 'cyberpunk'],
  authors: [{ name: 'Leslie Benson Achi' }],
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'CYBER DEFENSE NETWORK - Neural Security Training',
    description: 'Immersive cybersecurity training and phishing simulation platform with cyberpunk aesthetics',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0A0A23' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A23' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            <ToastProvider>
              <div className="min-h-screen bg-cyber-dark text-cyber-white transition-all duration-300 relative overflow-hidden">
                {/* Global Cyber Background Effect */}
                <div className="fixed inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 via-transparent to-cyber-purple/5" />
                  <div className="absolute inset-0 cyber-grid-bg opacity-10" />
                </div>

                {/* Main Content */}
                <div className="relative z-10">
                  {children}
                </div>
              </div>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
