import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin: cookie-based auth
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = request.cookies.get('admin_session')
    if (!session || session.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    return NextResponse.next()
  }

  // Siswa: Supabase auth required for PPDB form
  if (pathname === '/ppdb/daftar' || pathname.startsWith('/ppdb/daftar/')) {
    let response = NextResponse.next({ request })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            response = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/ppdb/daftar', '/ppdb/daftar/:path*'],
}
