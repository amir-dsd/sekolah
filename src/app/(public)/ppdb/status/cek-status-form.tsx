'use client'

import { useState } from 'react'
import { Search, Loader2, CheckCircle, XCircle, Clock, FileCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'
import { formatDate } from '@/lib/utils'
import type { Pendaftaran, StatusPendaftaran } from '@/types'

const statusConfig: Record<StatusPendaftaran, {
  label: string
  icon: React.ElementType
  variant: 'warning' | 'info' | 'success' | 'destructive'
  warna: string
  deskripsi: string
}> = {
  menunggu: {
    label: 'Menunggu Verifikasi',
    icon: Clock,
    variant: 'warning',
    warna: 'text-yellow-600',
    deskripsi: 'Berkas pendaftaran Anda sedang dalam antrian untuk diverifikasi oleh tim PPDB.',
  },
  diverifikasi: {
    label: 'Sedang Diverifikasi',
    icon: FileCheck,
    variant: 'info',
    warna: 'text-blue-600',
    deskripsi: 'Berkas Anda sedang dalam proses verifikasi. Mohon tunggu hasil seleksi.',
  },
  diterima: {
    label: 'Diterima',
    icon: CheckCircle,
    variant: 'success',
    warna: 'text-green-600',
    deskripsi: 'Selamat! Anda diterima di SMA Negeri 1 Contoh. Segera lakukan daftar ulang sesuai jadwal.',
  },
  ditolak: {
    label: 'Tidak Diterima',
    icon: XCircle,
    variant: 'destructive',
    warna: 'text-red-600',
    deskripsi: 'Mohon maaf, Anda belum diterima pada penerimaan siswa baru kali ini.',
  },
}

export function CekStatusForm() {
  const [nomor, setNomor] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<Pendaftaran | null>(null)
  const [error, setError] = useState('')

  const handleCek = async () => {
    if (!nomor.trim()) {
      setError('Masukkan nomor pendaftaran')
      return
    }
    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      const supabase = createClient()
      const { data, error: dbError } = await supabase
        .from('pendaftaran')
        .select('*')
        .eq('nomor_pendaftaran', nomor.trim().toUpperCase())
        .single()

      if (dbError || !data) {
        setError('Nomor pendaftaran tidak ditemukan. Pastikan nomor yang Anda masukkan benar.')
      } else {
        setResult(data)
      }
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  const config = result ? statusConfig[result.status] : null
  const StatusIcon = config?.icon

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="nomor">Nomor Pendaftaran</Label>
              <Input
                id="nomor"
                value={nomor}
                onChange={(e) => setNomor(e.target.value)}
                placeholder="Contoh: PPDB-20252026-0001"
                className="mt-1 uppercase"
                onKeyDown={(e) => e.key === 'Enter' && handleCek()}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div className="flex items-end">
              <Button onClick={handleCek} disabled={isLoading} className="bg-blue-700 hover:bg-blue-800">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                <span className="ml-2 hidden sm:block">Cek Status</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {result && config && StatusIcon && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <StatusIcon className={`h-6 w-6 ${config.warna}`} />
              Status Pendaftaran
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Status Banner */}
            <div className={`p-4 rounded-xl border-2 ${
              result.status === 'diterima' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50' :
              result.status === 'ditolak' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50' :
              result.status === 'diverifikasi' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50' :
              'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/50'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <StatusIcon className={`h-8 w-8 ${config.warna}`} />
                <div>
                  <Badge variant={config.variant} className="mb-1">{config.label}</Badge>
                  <p className="text-sm text-gray-600 dark:text-slate-400">{config.deskripsi}</p>
                </div>
              </div>
              {result.catatan_admin && (
                <div className="mt-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg text-sm">
                  <span className="font-medium text-gray-700 dark:text-slate-300">Catatan Admin: </span>
                  <span className="text-gray-600 dark:text-slate-400">{result.catatan_admin}</span>
                </div>
              )}
            </div>

            {/* Data Pendaftar */}
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-slate-200 mb-3 text-sm uppercase tracking-wide">Data Pendaftar</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: 'Nomor Pendaftaran', value: result.nomor_pendaftaran },
                  { label: 'Tahun Ajaran', value: result.tahun_ajaran },
                  { label: 'Nama Lengkap', value: result.nama_lengkap },
                  { label: 'Asal Sekolah', value: result.asal_sekolah },
                  { label: 'Pilihan Jurusan 1', value: result.pilihan_jurusan_1 },
                  { label: 'Pilihan Jurusan 2', value: result.pilihan_jurusan_2 || '-' },
                  { label: 'Tanggal Daftar', value: formatDate(result.created_at) },
                  { label: 'Terakhir Diperbarui', value: formatDate(result.updated_at) },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
                    <div className="text-xs text-gray-500 dark:text-slate-400 mb-0.5">{item.label}</div>
                    <div className="font-medium text-gray-800 dark:text-slate-200 text-sm">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/50">
        <CardContent className="pt-5 pb-4">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Butuh bantuan?</strong> Hubungi panitia PPDB di nomor <strong>(021) 1234-5678</strong> atau email <strong>ppdb@sman1contoh.sch.id</strong>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
