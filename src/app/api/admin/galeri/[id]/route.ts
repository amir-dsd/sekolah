import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'

async function isAdmin() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value ?? ''
  return session.includes('|admin') || session.includes('|super_admin')
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })

  const { id } = await params
  const supabase = createAdminClient()
  const { error } = await supabase.from('galeri').delete().eq('id', id)
  if (error) return NextResponse.json({ error: 'Gagal menghapus' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
