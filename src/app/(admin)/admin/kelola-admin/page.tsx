import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import { KelolaAdminClient } from './kelola-admin-client'

export const metadata: Metadata = { title: 'Kelola Admin' }

async function getAdmins() {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('admin_users')
      .select('id, email, nama, role, is_active, created_at')
      .order('created_at', { ascending: true })
    return data || []
  } catch {
    return []
  }
}

export default async function KelolaAdminPage() {
  const admins = await getAdmins()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Tambah atau nonaktifkan akun administrator</p>
        </div>
        <KelolaAdminClient admins={admins} />
      </div>
    </div>
  )
}
