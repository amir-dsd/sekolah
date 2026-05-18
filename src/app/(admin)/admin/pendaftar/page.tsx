import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Users } from 'lucide-react'
import { createAdminClient } from '@/lib/supabase/admin'
import { formatDate } from '@/lib/utils'
import { UpdateStatusForm } from './update-status-form'
import type { Pendaftaran, StatusPendaftaran } from '@/types'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Kelola Pendaftar PPDB' }

async function getAllPendaftar(): Promise<Pendaftaran[]> {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase.from('pendaftaran').select('*').order('created_at', { ascending: false })
    return data || []
  } catch { return [] }
}

const statusStyle: Record<StatusPendaftaran, { label: string; cls: string }> = {
  menunggu:     { label: 'Menunggu',     cls: 'bg-yellow-100 text-yellow-800' },
  diverifikasi: { label: 'Diverifikasi', cls: 'bg-blue-100 text-blue-800' },
  diterima:     { label: 'Diterima',     cls: 'bg-green-100 text-green-800' },
  ditolak:      { label: 'Ditolak',      cls: 'bg-red-100 text-red-700' },
}

export default async function PendaftarPage() {
  const list = await getAllPendaftar()
  const stat = {
    total: list.length,
    menunggu: list.filter(p => p.status === 'menunggu').length,
    diverifikasi: list.filter(p => p.status === 'diverifikasi').length,
    diterima: list.filter(p => p.status === 'diterima').length,
    ditolak: list.filter(p => p.status === 'ditolak').length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900">Pendaftar PPDB</h1>
              <p className="text-xs text-gray-400">{list.length} total pendaftar</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5">
        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Total',      val: stat.total,        cls: 'bg-white border-gray-200 text-gray-900' },
            { label: 'Menunggu',   val: stat.menunggu,     cls: 'bg-yellow-50 border-yellow-200 text-yellow-800' },
            { label: 'Verifikasi', val: stat.diverifikasi, cls: 'bg-blue-50 border-blue-200 text-blue-800' },
            { label: 'Diterima',   val: stat.diterima,     cls: 'bg-green-50 border-green-200 text-green-800' },
            { label: 'Ditolak',    val: stat.ditolak,      cls: 'bg-red-50 border-red-200 text-red-700' },
          ].map(s => (
            <div key={s.label} className={`rounded-xl border p-3 text-center ${s.cls}`}>
              <div className="text-2xl font-black">{s.val}</div>
              <div className="text-xs font-medium opacity-70 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border">
            <Users className="h-12 w-12 mx-auto mb-3 text-gray-200" />
            <p>Belum ada pendaftar</p>
          </div>
        ) : (
          <>
            {/* Mobile: card list */}
            <div className="sm:hidden space-y-3">
              {list.map(p => (
                <div key={p.id} className="bg-white rounded-2xl border p-4 shadow-sm space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{p.nama_lengkap}</p>
                      <p className="text-xs text-green-600 font-mono">{p.nomor_pendaftaran}</p>
                    </div>
                    <UpdateStatusForm
                      pendaftaranId={p.id}
                      currentStatus={p.status}
                      currentCatatan={p.catatan_admin || ''}
                      namaSiswa={p.nama_lengkap}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400 text-xs">Kontak</span>
                      <p className="font-medium text-gray-800">{p.no_telepon}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Tanggal Daftar</span>
                      <p className="font-medium text-gray-800">{formatDate(p.created_at)}</p>
                    </div>
                  </div>
                  {p.catatan_admin && (
                    <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 italic">"{p.catatan_admin}"</p>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop: table */}
            <div className="hidden sm:block bg-white rounded-2xl border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      {['No. Pendaftaran','Nama','Kota','Kontak','Tanggal','Status & Aksi'].map(h => (
                        <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {list.map(p => (
                      <tr key={p.id} className="hover:bg-green-50/40 transition-colors">
                        <td className="py-3 px-4 font-mono text-xs text-green-600 whitespace-nowrap">{p.nomor_pendaftaran}</td>
                        <td className="py-3 px-4">
                          <p className="font-semibold text-gray-900 whitespace-nowrap">{p.nama_lengkap}</p>
                          <p className="text-xs text-gray-400">{p.jenis_kelamin} · {p.agama}</p>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          <p>{p.kota}</p>
                          <p className="text-xs text-gray-400">{p.provinsi}</p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-gray-700">{p.no_telepon}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[130px]">{p.email}</p>
                        </td>
                        <td className="py-3 px-4 text-xs text-gray-500 whitespace-nowrap">{formatDate(p.created_at)}</td>
                        <td className="py-3 px-4">
                          <UpdateStatusForm
                            pendaftaranId={p.id}
                            currentStatus={p.status}
                            currentCatatan={p.catatan_admin || ''}
                            namaSiswa={p.nama_lengkap}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
