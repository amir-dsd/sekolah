import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'

const COOKIE_NAME = 'admin_session'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email dan password wajib diisi' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase.rpc('admin_login', {
    input_email: email,
    input_password: password,
  })

  if (error || !data || data.length === 0) {
    return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 })
  }

  const admin = data[0]
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, `${admin.id}|${admin.role}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  })

  return NextResponse.json({ ok: true, role: admin.role, nama: admin.nama })
}
