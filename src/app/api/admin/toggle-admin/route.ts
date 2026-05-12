import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const sessionValue = cookieStore.get('admin_session')?.value ?? ''
  const parts = sessionValue.split('|')
  const role = parts[1]
  const selfId = parts[0]

  if (role !== 'super_admin') {
    return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
  }

  const { id, is_active } = await request.json()

  if (!id || typeof is_active !== 'boolean') {
    return NextResponse.json({ error: 'Data tidak valid' }, { status: 400 })
  }

  if (id === selfId) {
    return NextResponse.json({ error: 'Tidak dapat menonaktifkan akun sendiri' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('admin_users')
    .update({ is_active })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: 'Gagal memperbarui status admin' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
