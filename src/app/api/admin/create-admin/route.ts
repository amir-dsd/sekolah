import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'

function getSessionRole(cookieValue: string): string | null {
  const parts = cookieValue.split('|')
  return parts.length === 2 ? parts[1] : null
}

function getSessionId(cookieValue: string): string | null {
  const parts = cookieValue.split('|')
  return parts.length === 2 ? parts[0] : null
}

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const sessionValue = cookieStore.get('admin_session')?.value ?? ''
  const role = getSessionRole(sessionValue)
  const adminId = getSessionId(sessionValue)

  if (role !== 'super_admin') {
    return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
  }

  const { email, password, nama, input_role } = await request.json()

  if (!email || !password || !nama || !input_role) {
    return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 })
  }

  if (!['admin', 'super_admin'].includes(input_role)) {
    return NextResponse.json({ error: 'Role tidak valid' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase.rpc('create_admin_user', {
    input_email: email,
    input_password: password,
    input_nama: nama,
    input_role: input_role,
    input_created_by: adminId,
  })

  if (error) {
    if (error.message?.includes('unique')) {
      return NextResponse.json({ error: 'Email sudah digunakan' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Gagal membuat akun admin' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, id: data })
}
