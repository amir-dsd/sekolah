import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { FormPendaftaran } from './form-pendaftaran'
import { UserCircle, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Formulir Pendaftaran PPDB',
  description: 'Formulir pendaftaran siswa baru Haya Bina Insani',
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
      <div className="container mx-auto px-8 py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">PPDB Belum Dibuka</h1>
          <p className="text-gray-600">Pendaftaran siswa baru belum dibuka saat ini. Silakan kunjungi kembali nanti.</p>
        </div>
      </div>
    )
  }

  // Check if user already registered this year
  let sudahDaftar = null
  if (user) {
    const { data } = await supabase
      .from('pendaftaran')
      .select('nomor_pendaftaran, nama_lengkap, status, created_at')
      .eq('user_id', user.id)
      .eq('tahun_ajaran', ppdb.tahun_ajaran)
      .single()
    sudahDaftar = data || null
  }

  const nama = user?.user_metadata?.nama_lengkap || ''
  const email = user?.email || ''

  // Already registered — block and show info
  if (sudahDaftar) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-10">
          <div className="container mx-auto px-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Formulir Pendaftaran PPDB TK</h1>
            <p className="text-green-100">Tahun Ajaran {ppdb.tahun_ajaran}</p>
          </div>
        </div>
        <div className="container mx-auto px-8 py-16 max-w-lg">
          <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-9 w-9 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Anda Sudah Mendaftar</h2>
            <p className="text-gray-500 text-sm mb-6">
              Akun ini sudah melakukan pendaftaran PPDB tahun ajaran <strong>{ppdb.tahun_ajaran}</strong>.
              Setiap akun hanya dapat mendaftar satu kali.
            </p>

            <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Nomor Pendaftaran</span>
                <span className="font-bold text-green-700">{sudahDaftar.nomor_pendaftaran}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Nama</span>
                <span className="font-medium text-gray-800">{sudahDaftar.nama_lengkap}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tanggal Daftar</span>
                <span className="font-medium text-gray-800">{formatDate(sudahDaftar.created_at)}</span>
              </div>
            </div>

            <Button asChild className="w-full bg-green-700 hover:bg-green-800">
              <Link href="/ppdb/status">
                Cek Status Pendaftaran <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-10">
        <div className="container mx-auto px-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Formulir Pendaftaran PPDB TK</h1>
          <p className="text-green-100">Tahun Ajaran {ppdb.tahun_ajaran} · Lengkapi semua data dengan benar</p>
          {user && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm">
              <UserCircle className="h-4 w-4" />
              Mendaftar sebagai <strong>{email}</strong>
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto px-8 py-8 max-w-4xl">
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
