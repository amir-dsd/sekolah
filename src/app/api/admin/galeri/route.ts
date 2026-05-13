import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'

async function isAdmin() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value ?? ''
  return session.includes('|admin') || session.includes('|super_admin')
}

export async function POST(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })

  const { judul, deskripsi, url_foto, kategori, urutan } = await request.json()
  if (!judul || !url_foto || !kategori) return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 })

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('galeri')
    .insert({ judul, deskripsi: deskripsi || null, url_foto, kategori, urutan: urutan ?? 0 })
    .select('id')
    .single()

  if (error) return NextResponse.json({ error: 'Gagal menyimpan' }, { status: 500 })
  return NextResponse.json({ ok: true, id: data.id })
}
