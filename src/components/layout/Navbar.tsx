'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bars3Icon, 
  XMarkIcon, 
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
  ShieldCheckIcon,
  HomeIcon,
  AcademicCapIcon,
  ChartBarIcon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '@/hooks/useAuth'
import { useNotifications } from '@/hooks/useNotifications'

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<any>
  roles?: string[]
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Training', href: '/training', icon: AcademicCapIcon },
  { name: 'Simulations', href: '/simulations', icon: ShieldCheckIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon, roles: ['admin', 'instructor'] },
  { name: 'Admin', href: '/admin', icon: CogIcon, roles: ['admin'] },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const { notifications, unreadCount, markAsRead, deleteNotification, markAllAsRead } = useNotifications()

  // Real-time search functionality
  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsSearching(true)
      // Simulate API call for search
      const searchTimeout = setTimeout(async () => {
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
          const results = await response.json()
          setSearchResults(results)
        } catch (error) {
          console.error('Search error:', error)
          setSearchResults([])
        } finally {
          setIsSearching(false)
        }
      }, 300)

      return () => clearTimeout(searchTimeout)
    } else {
      setSearchResults([])
      setIsSearching(false)
    }
  }, [searchQuery])

  const filteredNavigation = navigation.filter(item => 
    !item.roles || item.roles.includes(user?.role || 'user')
  )

  const handleLogout = async () => {
    await logout()
    router.push('/auth/login')
  }

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-cyber-dark/95 backdrop-blur-md border-b border-cyber-blue/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative">
                  <ShieldCheckIcon className="h-8 w-8 text-cyber-blue" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-cyber-blue/20"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <span className="text-xl font-bold text-gradient-cyber">
                  CYBER DEFENSE
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {filteredNavigation.map((item) => {
                  const isActive = pathname.startsWith(item.href)
                  return (
                    <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
                      <Link
                        href={item.href}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                          isActive
                            ? 'text-cyber-blue bg-cyber-blue/10 neon-glow-blue'
                            : 'text-cyber-white/70 hover:text-cyber-blue hover:bg-cyber-blue/5'
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-cyber-white/50" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (searchResults.length > 0) {
                        const first = (searchResults as any[])[0]
                        router.push(first.href)
                        setSearchQuery('')
                        setSearchResults([])
                      }
                    } else if (e.key === 'Escape') {
                      setSearchResults([])
                    }
                  }}
                  className="input-cyber pl-10 pr-4 py-2 w-full text-sm"
                  placeholder="Search modules, simulations..."
                />
                
                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {(searchResults.length > 0 || isSearching) && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-cyber-dark/95 backdrop-blur-md border border-cyber-blue/30 rounded-lg shadow-xl max-h-64 overflow-y-auto"
                    >
                      {isSearching ? (
                        <div className="p-4 text-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyber-blue mx-auto"></div>
                          <p className="text-cyber-white/70 mt-2">Searching...</p>
                        </div>
                      ) : (
                        searchResults.map((result: any, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-3 hover:bg-cyber-blue/10 cursor-pointer border-b border-cyber-blue/10 last:border-b-0"
                            onClick={() => {
                              router.push(result.href)
                              setSearchQuery('')
                              setSearchResults([])
                            }}
                          >
                            <p className="text-cyber-white font-medium">{result.title}</p>
                            <p className="text-cyber-white/60 text-sm">{result.description}</p>
                          </motion.div>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right side items */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              {/* Notifications */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <button 
                  className="p-2 rounded-full text-cyber-white/70 hover:text-cyber-blue transition-colors duration-300"
                  onClick={() => setIsNotificationsOpen(prev => !prev)}
                  aria-haspopup="true"
                  aria-expanded={isNotificationsOpen}
                >
                  <BellIcon className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 h-5 w-5 bg-cyber-red rounded-full flex items-center justify-center text-xs font-bold text-white"
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </motion.span>
                  )}
                </button>
                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-80 bg-cyber-dark/95 backdrop-blur-md border border-cyber-blue/30 rounded-lg shadow-xl overflow-hidden z-50"
                    >
                      <div className="flex items-center justify-between px-4 py-2 border-b border-cyber-blue/20">
                        <span className="text-sm font-medium text-cyber-white/80">Notifications</span>
                        <button 
                          className="text-xs text-cyber-white/60 hover:text-cyber-blue"
                          onClick={() => markAllAsRead()}
                        >
                          Mark all read
                        </button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-cyber-white/60 text-sm">No notifications</div>
                        ) : (
                          notifications.map((n: any) => (
                            <div key={n.id} className={`px-4 py-3 border-b border-cyber-blue/10 hover:bg-cyber-blue/5 ${n.read ? 'opacity-70' : ''}`}>
                              <div className="flex items-start gap-3">
                                <div className={`mt-0.5 h-2.5 w-2.5 rounded-full ${n.read ? 'bg-cyber-white/30' : 'bg-cyber-blue'}`} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-cyber-white line-clamp-1">{n.title}</p>
                                  <p className="text-xs text-cyber-white/70 line-clamp-2">{n.message}</p>
                                  <div className="mt-2 flex items-center gap-2">
                                    {n.actionUrl && (
                                      <button
                                        className="text-xs text-cyber-blue hover:underline"
                                        onClick={() => {
                                          markAsRead(n.id)
                                          router.push(n.actionUrl)
                                          setIsNotificationsOpen(false)
                                        }}
                                      >
                                        View
                                      </button>
                                    )}
                                    {!n.read && (
                                      <button className="text-xs text-cyber-white/60 hover:text-cyber-blue" onClick={() => markAsRead(n.id)}>Mark read</button>
                                    )}
                                    <button className="ml-auto text-xs text-cyber-white/60 hover:text-cyber-red" onClick={() => deleteNotification(n.id)}>Dismiss</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Profile dropdown */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg text-cyber-white/70 hover:text-cyber-blue hover:bg-cyber-blue/5 transition-all duration-300"
                >
                  <UserCircleIcon className="h-8 w-8" />
                  <span className="text-sm font-medium">{user?.name || 'User'}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </motion.button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-cyber-dark/95 backdrop-blur-md border border-cyber-blue/30 rounded-lg shadow-xl py-1"
                    >
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-cyber-white/70 hover:text-cyber-blue hover:bg-cyber-blue/5 transition-colors duration-300"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-cyber-white/70 hover:text-cyber-red hover:bg-cyber-red/5 transition-colors duration-300 flex items-center space-x-2"
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4" />
                        <span>Sign out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-cyber-white/70 hover:text-cyber-blue transition-colors duration-300"
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-cyber-dark/95 backdrop-blur-md border-t border-cyber-blue/30"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/* Mobile Search */}
                <div className="px-3 py-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5 text-cyber-white/50" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          if (searchResults.length > 0) {
                            const first = (searchResults as any[])[0]
                            router.push(first.href)
                            setSearchQuery('')
                            setSearchResults([])
                            setIsOpen(false)
                          }
                        } else if (e.key === 'Escape') {
                          setSearchResults([])
                        }
                      }}
                      className="input-cyber pl-10 pr-4 py-2 w-full text-sm"
                      placeholder="Search..."
                    />
                  </div>
                </div>

                {/* Mobile Navigation */}
                {filteredNavigation.map((item) => {
                  const isActive = pathname.startsWith(item.href)
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 flex items-center space-x-2 ${
                          isActive
                            ? 'text-cyber-blue bg-cyber-blue/10'
                            : 'text-cyber-white/70 hover:text-cyber-blue hover:bg-cyber-blue/5'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  )
                })}

                {/* Mobile Profile Section */}
                <div className="border-t border-cyber-blue/30 pt-4 pb-3">
                  <div className="flex items-center px-3">
                    <UserCircleIcon className="h-10 w-10 text-cyber-blue" />
                    <div className="ml-3">
                      <div className="text-base font-medium text-cyber-white">
                        {user?.name || 'User'}
                      </div>
                      <div className="text-sm text-cyber-white/60">
                        {user?.email || 'user@example.com'}
                      </div>
                    </div>
                    {unreadCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyber-red text-white">
                          {unreadCount}
                        </span>
                      </motion.div>
                    )}
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link
                      href="/profile"
                      className="block px-3 py-2 rounded-md text-base font-medium text-cyber-white/70 hover:text-cyber-blue hover:bg-cyber-blue/5 transition-colors duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-cyber-white/70 hover:text-cyber-red hover:bg-cyber-red/5 transition-colors duration-300"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16" />
    </>
  )
}