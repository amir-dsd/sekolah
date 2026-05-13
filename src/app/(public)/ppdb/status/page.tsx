import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { CekStatusForm } from './cek-status-form'

export const metadata: Metadata = {
  title: 'Cek Status Pendaftaran PPDB',
  description: 'Cek status pendaftaran siswa baru Haya Bina Insani',
}

export default async function StatusPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Auto-load pendaftaran if user is logged in
  let pendaftaranSaya = null
  if (user) {
    const { data } = await supabase
      .from('pendaftaran')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    pendaftaranSaya = data || null
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Cek Status Pendaftaran</h1>
          <p className="text-blue-100 text-lg">
            {user ? 'Status pendaftaran Anda ditampilkan di bawah' : 'Masukkan nomor pendaftaran Anda untuk melihat status terkini'}
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <CekStatusForm isLoggedIn={!!user} pendaftaranAwal={pendaftaranSaya} />
      </div>
    </div>
  )
}
