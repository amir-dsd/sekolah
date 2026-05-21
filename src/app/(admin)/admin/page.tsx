import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { Users, BookOpen, CheckCircle, Clock, XCircle, FileCheck, ArrowRight, ShieldCheck, Images } from 'lucide-react'
import { LogoHBI } from '@/components/logo'
import { createAdminClient } from '@/lib/supabase/admin'
import { formatDate } from '@/lib/utils'
import { LogoutButton } from './logout-button'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Admin Dashboard' }

async function getDashboardData() {
  try {
    const supabase = createAdminClient()
    const [pendaftaranRes, beritaRes, terbaruRes] = await Promise.all([
      supabase.from('pendaftaran').select('status'),
      supabase.from('berita').select('id', { count: 'exact', head: true }),
      supabase.from('pendaftaran').select('*').order('created_at', { ascending: false }).limit(5),
    ])
    const p = pendaftaranRes.data || []
    return {
      stats: {
        total: p.length,
        menunggu: p.filter(x => x.status === 'menunggu').length,
        diverifikasi: p.filter(x => x.status === 'diverifikasi').length,
        diterima: p.filter(x => x.status === 'diterima').length,
        ditolak: p.filter(x => x.status === 'ditolak').length,
        berita: beritaRes.count || 0,
      },
      terbaru: terbaruRes.data || [],
    }
  } catch {
    return { stats: { total:0, menunggu:0, diverifikasi:0, diterima:0, ditolak:0, berita:0 }, terbaru: [] }
  }
}

const statusBadge: Record<string, string> = {
  menunggu:     'bg-yellow-100 text-yellow-800',
  diverifikasi: 'bg-blue-100 text-blue-800',
  diterima:     'bg-green-100 text-green-800',
  ditolak:      'bg-red-100 text-red-700',
}

export default async function AdminPage() {
  const { stats, terbaru } = await getDashboardData()
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('admin_session')?.value ?? ''
  const isSuperAdmin = sessionCookie.endsWith('|super_admin')

  const statCards = [
    { label: 'Total Pendaftar', val: stats.total,        icon: Users,      color: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-100' },
    { label: 'Menunggu',        val: stats.menunggu,     icon: Clock,      color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100' },
    { label: 'Diverifikasi',    val: stats.diverifikasi, icon: FileCheck,  color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
    { label: 'Diterima',        val: stats.diterima,     icon: CheckCircle,color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-100' },
    { label: 'Ditolak',         val: stats.ditolak,      icon: XCircle,    color: 'text-red-500',    bg: 'bg-red-50',    border: 'border-red-100' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Topbar */}
      <div className="bg-white/80 backdrop-blur border-b sticky top-0 z-20 shadow-sm">
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoHBI size={36} />
            <div>
              <p className="font-bold text-gray-900 text-sm leading-tight">Admin Dashboard</p>
              <p className="text-xs text-gray-400">Haya Bina Insani</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin/pendaftar" className="hidden sm:flex text-sm text-gray-600 hover:text-blue-700 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
              Pendaftar
            </Link>
            {isSuperAdmin && (
              <Link href="/admin/kelola-admin" className="hidden sm:flex text-sm text-gray-600 hover:text-emerald-700 font-medium px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors">
                Kelola Admin
              </Link>
            )}
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl p-5 sm:p-6 text-white shadow-lg shadow-blue-200">
          <p className="text-blue-200 text-sm font-medium mb-1">Selamat datang kembali 👋</p>
          <h2 className="text-xl sm:text-2xl font-bold">Dashboard Administrasi</h2>
          <p className="text-blue-100 text-sm mt-1">PPDB 2025/2026 · {stats.menunggu} pendaftar menunggu verifikasi</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {statCards.map(({ label, val, icon: Icon, color, bg, border }) => (
            <div key={label} className={`${bg} border ${border} rounded-2xl p-4 text-center hover:shadow-md transition-all hover:-translate-y-0.5`}>
              <Icon className={`h-5 w-5 ${color} mx-auto mb-2`} />
              <div className={`text-2xl font-black ${color}`}>{val}</div>
              <div className="text-xs text-gray-500 mt-0.5 leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/admin/pendaftar" className="group bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md hover:border-blue-200 transition-all">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-700 transition-colors">
              <Users className="h-6 w-6 text-blue-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900">Kelola Pendaftar PPDB</p>
              <p className="text-sm text-gray-500">Verifikasi, terima, atau tolak</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </Link>
          <Link href="/admin/galeri" className="group bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md hover:border-orange-200 transition-all">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-600 transition-colors">
              <Images className="h-6 w-6 text-orange-600 group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900">Kelola Galeri</p>
              <p className="text-sm text-gray-500">Tambah dan hapus foto galeri sekolah</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
          </Link>
          {isSuperAdmin && (
            <Link href="/admin/kelola-admin" className="group bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md hover:border-emerald-200 transition-all">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-700 transition-colors">
                <ShieldCheck className="h-6 w-6 text-emerald-700 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900">Kelola Admin</p>
                <p className="text-sm text-gray-500">Tambah dan nonaktifkan akun admin</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
            </Link>
          )}
        </div>

        {/* Recent pendaftar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <p className="font-bold text-gray-900">Pendaftar Terbaru</p>
            <Link href="/admin/pendaftar" className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1">
              Lihat semua <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {terbaru.length > 0 ? (
            <>
              {/* Mobile */}
              <div className="sm:hidden divide-y">
                {terbaru.map(p => (
                  <div key={p.id} className="px-4 py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{p.nama_lengkap}</p>
                      <p className="text-xs text-gray-400">{formatDate(p.created_at)}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 ${statusBadge[p.status]}`}>
                      {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
              {/* Desktop */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      {['No. Pendaftaran','Nama','Status','Tanggal'].map(h => (
                        <th key={h} className="py-2.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {terbaru.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                        <td className="py-3 px-4 font-mono text-xs text-green-600">{p.nomor_pendaftaran}</td>
                        <td className="py-3 px-4 font-semibold text-gray-900">{p.nama_lengkap}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statusBadge[p.status]}`}>
                            {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-gray-400">{formatDate(p.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-gray-400">
              <Users className="h-10 w-10 mx-auto mb-2 text-gray-200" />
              <p className="text-sm">Belum ada pendaftar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
