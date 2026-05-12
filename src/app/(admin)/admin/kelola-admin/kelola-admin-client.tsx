'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Loader2, ShieldCheck, Shield, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

type Admin = {
  id: string
  email: string
  nama: string
  role: string
  is_active: boolean
  created_at: string
}

type Props = {
  admins: Admin[]
}

function TambahAdminForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nama, setNama] = useState('')
  const [role, setRole] = useState('admin')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    const res = await fetch('/api/admin/create-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, nama, input_role: role }),
    })

    const data = await res.json()
    if (res.ok) {
      setSuccess('Akun admin berhasil dibuat.')
      setEmail('')
      setPassword('')
      setNama('')
      setRole('admin')
      onSuccess()
    } else {
      setError(data.error || 'Gagal membuat akun admin.')
    }
    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Plus className="h-4 w-4" /> Tambah Admin Baru
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nama">Nama Lengkap</Label>
            <Input id="nama" value={nama} onChange={e => setNama(e.target.value)} placeholder="Nama admin" className="mt-1" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@sekolah.sch.id" className="mt-1" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min. 8 karakter"
                className="pr-10"
                minLength={8}
                required
              />
              <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              value={role}
              onChange={e => setRole(e.target.value)}
              className="mt-1 w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          {error && <p className="sm:col-span-2 text-red-500 text-sm">{error}</p>}
          {success && <p className="sm:col-span-2 text-green-600 text-sm">{success}</p>}

          <div className="sm:col-span-2 flex justify-end">
            <Button type="submit" disabled={isLoading} className="bg-blue-700 hover:bg-blue-800">
              {isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Menyimpan...</> : 'Tambah Admin'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export function KelolaAdminClient({ admins: initialAdmins }: Props) {
  const router = useRouter()
  const [admins, setAdmins] = useState(initialAdmins)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleToggle = async (id: string, currentActive: boolean) => {
    setLoadingId(id)
    const res = await fetch('/api/admin/toggle-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, is_active: !currentActive }),
    })
    if (res.ok) {
      setAdmins(prev => prev.map(a => a.id === id ? { ...a, is_active: !currentActive } : a))
    }
    setLoadingId(null)
  }

  return (
    <div className="space-y-6">
      <TambahAdminForm onSuccess={() => router.refresh()} />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daftar Admin ({admins.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {admins.map(admin => (
              <div key={admin.id} className="px-5 py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: admin.role === 'super_admin' ? '#ecfdf5' : '#eff6ff' }}>
                  {admin.role === 'super_admin'
                    ? <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    : <Shield className="h-5 w-5 text-blue-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-900 text-sm">{admin.nama}</p>
                    <Badge variant={admin.role === 'super_admin' ? 'success' : 'info'} className="text-xs">
                      {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </Badge>
                    {!admin.is_active && <Badge variant="destructive" className="text-xs">Nonaktif</Badge>}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{admin.email} · Dibuat {formatDate(admin.created_at)}</p>
                </div>
                <Button
                  size="sm"
                  variant={admin.is_active ? 'outline' : 'default'}
                  disabled={loadingId === admin.id}
                  onClick={() => handleToggle(admin.id, admin.is_active)}
                  className={admin.is_active ? 'text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300' : 'bg-green-700 hover:bg-green-800'}
                >
                  {loadingId === admin.id
                    ? <Loader2 className="h-4 w-4 animate-spin" />
                    : admin.is_active
                      ? <><XCircle className="h-4 w-4 mr-1" /> Nonaktifkan</>
                      : <><CheckCircle className="h-4 w-4 mr-1" /> Aktifkan</>
                  }
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
