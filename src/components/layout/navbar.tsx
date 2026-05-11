'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DarkModeToggle } from '@/components/dark-mode-toggle'

const navItems = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/program', label: 'Program' },
  { href: '/berita', label: 'Berita' },
  { href: '/ppdb', label: 'PPDB' },
  { href: '/kontak', label: 'Kontak' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-blue-700 dark:text-blue-400 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center shadow-sm">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="hidden sm:block text-base font-extrabold tracking-tight">SMA Negeri 1 Contoh</span>
            <span className="block sm:hidden text-base font-extrabold">SMAN 1</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                    active
                      ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <DarkModeToggle />
            <Link
              href="/ppdb/status"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
            >
              Cek Status
            </Link>
            <Link
              href="/ppdb/daftar"
              className="text-sm bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-px"
            >
              Daftar PPDB
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-1">
            <DarkModeToggle />
          <button
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5 text-gray-700 dark:text-gray-300" /> : <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />}
          </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div
            className="md:hidden border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 space-y-1"
            style={{ animation: 'slideUp 0.2s ease-out' }}
          >
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'block px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                    active ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-400'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="pt-3 pb-1 grid grid-cols-2 gap-2">
              <Link
                href="/ppdb/status"
                onClick={() => setIsOpen(false)}
                className="text-center text-sm border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-medium py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cek Status
              </Link>
              <Link
                href="/ppdb/daftar"
                onClick={() => setIsOpen(false)}
                className="text-center text-sm bg-blue-700 text-white font-semibold py-2.5 rounded-xl hover:bg-blue-800 transition-colors"
              >
                Daftar PPDB
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
