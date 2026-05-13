'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, CheckCircle, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'

export function RegisterForm() {
  const router = useRouter()
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!nama.trim()) return setError('Nama lengkap wajib diisi')
    if (password.length < 6) return setError('Password minimal 6 karakter')
    if (password !== confirm) return setError('Konfirmasi password tidak cocok')

    setIsLoading(true)
    const supabase = createClient()

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nama_lengkap: nama },
        emailRedirectTo: `${location.origin}/api/auth/callback?next=/ppdb/daftar`,
      },
    })

    if (signUpError) {
      setError(
        signUpError.message.includes('already registered')
          ? 'Email sudah terdaftar. Silakan login.'
          : signUpError.message
      )
      setIsLoading(false)
      return
    }

    // If session exists, email confirmation is disabled — auto login
    if (data.session) {
      router.push('/ppdb/daftar')
      router.refresh()
      return
    }

    // Otherwise show "check your email" message
    setNeedsConfirmation(true)
    setIsLoading(false)
  }

  if (needsConfirmation) {
    return (
      <Card className="w-full max-w-md mx-auto text-center py-8">
        <CardContent>
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Cek Email Anda!</h2>
          <p className="text-gray-600 mb-1">Kami mengirim link konfirmasi ke:</p>
          <p className="font-semibold text-blue-700 mb-6">{email}</p>
          <p className="text-sm text-gray-500 mb-6">Klik link di email tersebut untuk mengaktifkan akun Anda, lalu login untuk melanjutkan pendaftaran.</p>
          <Link href="/auth/login">
            <Button className="bg-blue-700 hover:bg-blue-800">Ke Halaman Login</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center pb-4">
        <div className="w-14 h-14 bg-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <GraduationCap className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold">Buat Akun Siswa</CardTitle>
        <CardDescription>Daftar untuk mengikuti PPDB Haya Bina Insani</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nama">Nama Lengkap <span className="text-red-500">*</span></Label>
            <Input
              id="nama"
              value={nama}
              onChange={e => setNama(e.target.value)}
              placeholder="Sesuai akta kelahiran"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="email@contoh.com"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="confirm">Konfirmasi Password <span className="text-red-500">*</span></Label>
            <Input
              id="confirm"
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Ulangi password"
              required
              className="mt-1"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <Button type="submit" disabled={isLoading} className="w-full bg-blue-700 hover:bg-blue-800 h-11 text-base font-semibold">
            {isLoading
              ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Mendaftarkan...</>
              : 'Buat Akun'}
          </Button>

          <p className="text-center text-sm text-gray-500">
            Sudah punya akun?{' '}
            <Link href="/auth/login" className="text-blue-700 hover:underline font-semibold">
              Masuk di sini
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
