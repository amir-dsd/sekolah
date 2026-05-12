import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { FormPendaftaran } from './form-pendaftaran'
import { UserCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Formulir Pendaftaran PPDB',
  description: 'Formulir pendaftaran siswa baru SMA Negeri 1 Contoh',
}

async function getPPDB() {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('pengaturan_ppdb')
      .select('*')
      .eq('status', true)
      .single()
    return data
  } catch {
    return null
  }
}

export default async function DaftarPage() {
  const supabase = await createClient()
  const [ppdb, { data: { user } }] = await Promise.all([
    getPPDB(),
    supabase.auth.getUser(),
  ])

  if (!ppdb) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">PPDB Belum Dibuka</h1>
          <p className="text-gray-600">Pendaftaran siswa baru belum dibuka saat ini. Silakan kunjungi kembali nanti.</p>
        </div>
      </div>
    )
  }

  const nama = user?.user_metadata?.nama_lengkap || ''
  const email = user?.email || ''

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Formulir Pendaftaran PPDB</h1>
          <p className="text-blue-100">Tahun Ajaran {ppdb.tahun_ajaran} · Lengkapi semua data dengan benar</p>
          {user && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm">
              <UserCircle className="h-4 w-4" />
              Mendaftar sebagai <strong>{email}</strong>
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <FormPendaftaran
          tahunAjaran={ppdb.tahun_ajaran}
          userId={user?.id}
          defaultNama={nama}
          defaultEmail={email}
        />
      </div>
    </div>
  )
}
