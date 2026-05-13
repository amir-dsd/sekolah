import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import { GaleriClient } from './galeri-client'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Kelola Galeri' }

async function getGaleri() {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('galeri')
      .select('*')
      .order('urutan', { ascending: true })
      .order('created_at', { ascending: false })
    return data || []
  } catch {
    return []
  }
}

export default async function AdminGaleriPage() {
  const items = await getGaleri()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Galeri</h1>
          <p className="text-sm text-gray-500 mt-1">Tambah, ubah urutan, atau hapus foto galeri sekolah</p>
        </div>
        <GaleriClient items={items} />
      </div>
    </div>
  )
}
