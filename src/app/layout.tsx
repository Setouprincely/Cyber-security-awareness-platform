import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { ToastProvider } from '@/components/providers/ToastProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { QueryProvider } from '@/components/providers/QueryProvider'

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
      <body className="font-sans antialiased">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange={false}
          >
            <AuthProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}