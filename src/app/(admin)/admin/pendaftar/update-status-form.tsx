'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle, XCircle, Clock, FileCheck, X, FileText, ExternalLink, FolderOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { StatusPendaftaran } from '@/types'

const statusOptions: { value: StatusPendaftaran; label: string; bg: string; icon: React.ElementType }[] = [
  { value: 'menunggu',    label: 'Menunggu',    bg: 'bg-yellow-50 border-yellow-300 text-yellow-800', icon: Clock },
  { value: 'diverifikasi',label: 'Diverifikasi',bg: 'bg-blue-50 border-blue-300 text-blue-800',       icon: FileCheck },
  { value: 'diterima',    label: 'Diterima',    bg: 'bg-green-50 border-green-300 text-green-800',    icon: CheckCircle },
  { value: 'ditolak',     label: 'Ditolak',     bg: 'bg-red-50 border-red-300 text-red-800',          icon: XCircle },
]

const badgeBg: Record<StatusPendaftaran, string> = {
  menunggu:     'bg-yellow-100 text-yellow-800',
  diverifikasi: 'bg-blue-100 text-blue-800',
  diterima:     'bg-green-100 text-green-800',
  ditolak:      'bg-red-100 text-red-700',
}

const dokumenLabel: Record<string, string> = {
  kartu_keluarga: 'Kartu Keluarga',
  akta_lahir:     'Akta Kelahiran',
  ijazah:         'Ijazah SMP',
  foto:           'Pas Foto',
}

type DokumenItem = {
  jenis_dokumen: string
  url_dokumen: string
  nama_file: string
}

function isImage(url: string) {
  return /\.(jpe?g|png|webp|gif)$/i.test(url)
}

export function UpdateStatusForm({
  pendaftaranId,
  currentStatus,
  currentCatatan,
  namaSiswa,
}: {
  pendaftaranId: string
  currentStatus: StatusPendaftaran
  currentCatatan: string
  namaSiswa: string
}) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<StatusPendaftaran>(currentStatus)
  const [catatan, setCatatan] = useState(currentCatatan)
  const [isLoading, setIsLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [dokumen, setDokumen] = useState<DokumenItem[]>([])
  const [loadingDokumen, setLoadingDokumen] = useState(false)
  const [preview, setPreview] = useState<DokumenItem | null>(null)

  const openModal = async () => {
    setIsOpen(true)
    setLoadingDokumen(true)
    try {
      const supabase = createClient()
      const { data } = await supabase
        .from('dokumen_pendaftaran')
        .select('jenis_dokumen, url_dokumen, nama_file')
        .eq('pendaftaran_id', pendaftaranId)
      setDokumen(data || [])
    } finally {
      setLoadingDokumen(false)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      await supabase.from('pendaftaran').update({ status, catatan_admin: catatan }).eq('id', pendaftaranId)
      setSaved(true)
      setTimeout(() => { setIsOpen(false); setSaved(false); router.refresh() }, 900)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={openModal}
        className={`text-xs px-2.5 py-1 rounded-full font-semibold cursor-pointer hover:opacity-75 transition-opacity ${badgeBg[currentStatus]}`}
      >
        {statusOptions.find(o => o.value === currentStatus)?.label} ▾
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => { setIsOpen(false); setPreview(null) }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ animation: 'slideUp 0.2s ease-out' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-bold text-gray-900 text-lg">Detail Pendaftar</h2>
                <p className="text-sm text-gray-500 mt-0.5">{namaSiswa}</p>
              </div>
              <button onClick={() => { setIsOpen(false); setPreview(null) }} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Dokumen Section */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-blue-600" /> Dokumen Pendaftaran
                </h3>

                {loadingDokumen ? (
                  <div className="flex items-center gap-2 text-sm text-gray-400 py-4">
                    <Loader2 className="h-4 w-4 animate-spin" /> Memuat dokumen...
                  </div>
                ) : dokumen.length === 0 ? (
                  <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl py-6 text-center text-sm text-gray-400">
                    Belum ada dokumen yang diupload
                  </div>
                ) : (
                  <div className="space-y-2">
                    {dokumen.map((doc, i) => (
                      <div key={i} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                        <FileText className="h-5 w-5 text-blue-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800">
                            {dokumenLabel[doc.jenis_dokumen] || doc.jenis_dokumen}
                          </p>
                          <p className="text-xs text-gray-400 truncate">{doc.nama_file}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          {isImage(doc.url_dokumen) && (
                            <button
                              onClick={() => setPreview(preview?.url_dokumen === doc.url_dokumen ? null : doc)}
                              className="text-xs px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium transition-colors"
                            >
                              {preview?.url_dokumen === doc.url_dokumen ? 'Tutup' : 'Preview'}
                            </button>
                          )}
                          <a
                            href={doc.url_dokumen}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" /> Buka
                          </a>
                        </div>
                      </div>
                    ))}

                    {/* Inline image preview */}
                    {preview && isImage(preview.url_dokumen) && (
                      <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={preview.url_dokumen}
                          alt={dokumenLabel[preview.jenis_dokumen] || preview.jenis_dokumen}
                          className="w-full max-h-72 object-contain"
                        />
                        <p className="text-center text-xs text-gray-400 py-2">
                          {dokumenLabel[preview.jenis_dokumen] || preview.jenis_dokumen}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="border-t" />

              {/* Status Update Section */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Update Status</h3>
                <div className="grid grid-cols-2 gap-2">
                  {statusOptions.map(opt => {
                    const Icon = opt.icon
                    const isSelected = status === opt.value
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setStatus(opt.value)}
                        className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          isSelected ? `${opt.bg} border-current scale-[1.02]` : 'border-gray-200 text-gray-500 hover:border-gray-300 bg-gray-50'
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Catatan <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <textarea
                  value={catatan}
                  onChange={e => setCatatan(e.target.value)}
                  placeholder="Alasan keputusan, informasi tambahan untuk pendaftar..."
                  rows={3}
                  className="w-full text-sm border border-gray-300 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={isLoading || saved}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm text-white transition-all ${
                    saved ? 'bg-green-500' : 'bg-blue-700 hover:bg-blue-800 active:scale-95'
                  } disabled:opacity-70`}
                >
                  {saved ? <><CheckCircle className="h-4 w-4" /> Tersimpan!</> :
                   isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Menyimpan...</> :
                   'Simpan Perubahan'}
                </button>
                <button
                  onClick={() => { setIsOpen(false); setPreview(null) }}
                  className="px-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  )
}
