import Link from 'next/link'
import { Shield } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    platform: [
      { name: 'Training Modules', href: '/training' },
      { name: 'Phishing Simulations', href: '/simulations' },
      { name: 'Analytics', href: '/analytics' },
      { name: 'Dashboard', href: '/dashboard' },
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Support', href: '/support' },
      { name: 'Blog', href: '/blog' },
      { name: 'API Reference', href: '/api-docs' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    security: [
      { name: 'Security Center', href: '/security' },
      { name: 'Report Vulnerability', href: '/security/report' },
      { name: 'Security Best Practices', href: '/security/best-practices' },
      { name: 'Compliance', href: '/compliance' },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-lg font-bold">CyberSec Platform</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Empowering organizations with comprehensive cybersecurity awareness training 
              and phishing simulation tools.
            </p>
            <div className="mt-6">
              <p className="text-sm text-gray-400">
                Final Year Project by<br />
                <span className="font-medium text-white">Leslie Benson Achi</span>
              </p>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Platform
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Security Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Security
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.security.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} Cybersecurity Awareness Platform. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link 
                href="/privacy" 
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link 
                href="/security" 
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
