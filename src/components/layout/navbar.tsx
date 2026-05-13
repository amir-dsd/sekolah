'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, LogOut, UserCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { LogoHBI } from '@/components/logo'
import type { User } from '@supabase/supabase-js'

const navItems = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/program', label: 'Program' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/berita', label: 'Berita' },
  { href: '/ppdb', label: 'PPDB' },
  { href: '/kontak', label: 'Kontak' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const nama = user?.user_metadata?.nama_lengkap || user?.email || ''

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-blue-700 hover:opacity-90 transition-opacity">
            <LogoHBI size={36} />
            <div className="leading-tight">
              <span className="hidden sm:block text-sm font-extrabold tracking-tight text-blue-800">Haya Bina Insani</span>
              <span className="block sm:hidden text-sm font-extrabold text-blue-800">HBI</span>
            </div>
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
                    active ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop auth area */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <div className="flex items-center gap-1.5 text-sm text-gray-600 px-3 py-1.5">
                  <UserCircle className="h-4 w-4 text-blue-600" />
                  <span className="font-medium max-w-[140px] truncate">{nama}</span>
                </div>
                <Link
                  href="/ppdb/status"
                  className="text-sm text-gray-500 hover:text-blue-700 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Status Saya
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all"
                >
                  <LogOut className="h-4 w-4" /> Keluar
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/ppdb/status"
                  className="text-sm text-gray-500 hover:text-blue-700 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cek Status
                </Link>
                <Link
                  href="/auth/login"
                  className="text-sm border border-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-xl hover:bg-gray-50 transition-all"
                >
                  Masuk
                </Link>
                <Link
                  href="/ppdb/daftar"
                  className="text-sm bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-px"
                >
                  Daftar PPDB
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="flex md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5 text-gray-700" /> : <Menu className="h-5 w-5 text-gray-700" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div
            className="md:hidden border-t border-gray-100 bg-white py-4 space-y-1"
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
                    active ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-700'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}

            {user ? (
              <div className="pt-3 pb-1 space-y-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-xl">
                  <UserCircle className="h-4 w-4 text-blue-600 shrink-0" />
                  <span className="text-sm font-medium text-blue-800 truncate">{nama}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/ppdb/status"
                    onClick={() => setIsOpen(false)}
                    className="text-center text-sm border border-gray-200 text-gray-700 font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Status Saya
                  </Link>
                  <button
                    onClick={() => { setIsOpen(false); handleLogout() }}
                    className="text-center text-sm border border-red-200 text-red-600 font-medium py-2.5 rounded-xl hover:bg-red-50 transition-colors"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-3 pb-1 grid grid-cols-2 gap-2">
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center text-sm border border-gray-200 text-gray-700 font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/ppdb/daftar"
                  onClick={() => setIsOpen(false)}
                  className="text-center text-sm bg-blue-700 text-white font-semibold py-2.5 rounded-xl hover:bg-blue-800 transition-colors"
                >
                  Daftar PPDB
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
