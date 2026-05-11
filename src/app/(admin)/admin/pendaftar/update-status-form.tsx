'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle, XCircle, Clock, FileCheck, X } from 'lucide-react'
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
        onClick={() => setIsOpen(true)}
        className={`text-xs px-2.5 py-1 rounded-full font-semibold cursor-pointer hover:opacity-75 transition-opacity ${badgeBg[currentStatus]}`}
      >
        {statusOptions.find(o => o.value === currentStatus)?.label} ▾
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4 animate-in"
            style={{ animation: 'slideUp 0.2s ease-out' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-bold text-gray-900">Update Status</h2>
                <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{namaSiswa}</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

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

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Catatan <span className="text-gray-400 font-normal">(opsional)</span>
              </label>
              <textarea
                value={catatan}
                onChange={e => setCatatan(e.target.value)}
                placeholder="Alasan keputusan..."
                rows={3}
                className="w-full text-sm border border-gray-300 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2 pt-1">
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
                onClick={() => setIsOpen(false)}
                className="px-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
              >
                Batal
              </button>
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
