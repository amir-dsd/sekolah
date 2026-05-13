'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Plus, Loader2, Trash2, Images } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createAdminClient } from '@/lib/supabase/admin'

type GaleriItem = {
  id: string
  judul: string
  deskripsi: string | null
  url_foto: string
  kategori: string
  urutan: number
}

const KATEGORI = [
  { value: 'kegiatan', label: 'Kegiatan' },
  { value: 'fasilitas', label: 'Fasilitas' },
  { value: 'ruang_kelas', label: 'Ruang Kelas' },
]

function TambahFotoForm({ onSuccess }: { onSuccess: () => void }) {
  const [judul, setJudul] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [urlFoto, setUrlFoto] = useState('')
  const [kategori, setKategori] = useState('kegiatan')
  const [urutan, setUrutan] = useState('0')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!judul || !urlFoto) { setError('Judul dan URL foto wajib diisi'); return }
    setIsLoading(true)
    setError('')

    const res = await fetch('/api/admin/galeri', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ judul, deskripsi, url_foto: urlFoto, kategori, urutan: parseInt(urutan) }),
    })

    if (res.ok) {
      setJudul(''); setDeskripsi(''); setUrlFoto(''); setUrutan('0')
      onSuccess()
    } else {
      const d = await res.json()
      setError(d.error || 'Gagal menyimpan foto')
    }
    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Plus className="h-4 w-4" /> Tambah Foto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="judul">Judul Foto</Label>
            <Input id="judul" value={judul} onChange={e => setJudul(e.target.value)} placeholder="Contoh: Kegiatan OSIS" className="mt-1" required />
          </div>
          <div>
            <Label htmlFor="kategori">Kategori</Label>
            <select id="kategori" value={kategori} onChange={e => setKategori(e.target.value)}
              className="mt-1 w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
              {KATEGORI.map(k => <option key={k.value} value={k.value}>{k.label}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="url_foto">URL Foto</Label>
            <Input id="url_foto" value={urlFoto} onChange={e => setUrlFoto(e.target.value)} placeholder="https://..." className="mt-1" required />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="deskripsi">Deskripsi (opsional)</Label>
            <Input id="deskripsi" value={deskripsi} onChange={e => setDeskripsi(e.target.value)} placeholder="Keterangan singkat" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="urutan">Urutan Tampil</Label>
            <Input id="urutan" type="number" value={urutan} onChange={e => setUrutan(e.target.value)} className="mt-1" min={0} />
          </div>

          {error && <p className="sm:col-span-2 text-red-500 text-sm">{error}</p>}
          <div className="sm:col-span-2 flex justify-end">
            <Button type="submit" disabled={isLoading} className="bg-blue-700 hover:bg-blue-800">
              {isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Menyimpan...</> : 'Simpan Foto'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export function GaleriClient({ items: initialItems }: { items: GaleriItem[] }) {
  const router = useRouter()
  const [items, setItems] = useState(initialItems)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [aktif, setAktif] = useState('semua')

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus foto ini?')) return
    setDeletingId(id)
    const res = await fetch(`/api/admin/galeri/${id}`, { method: 'DELETE' })
    if (res.ok) setItems(prev => prev.filter(i => i.id !== id))
    setDeletingId(null)
  }

  const filtered = aktif === 'semua' ? items : items.filter(i => i.kategori === aktif)

  return (
    <div className="space-y-6">
      <TambahFotoForm onSuccess={() => router.refresh()} />

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-base">Foto Galeri ({items.length})</CardTitle>
            <div className="flex gap-2 flex-wrap">
              {[{ value: 'semua', label: 'Semua' }, ...KATEGORI].map(k => (
                <button key={k.value} onClick={() => setAktif(k.value)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${aktif === k.value ? 'bg-blue-700 text-white border-blue-700' : 'text-gray-600 border-gray-200 hover:border-blue-300'}`}>
                  {k.label}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Images className="h-10 w-10 mx-auto mb-2 text-gray-200" />
              <p className="text-sm">Belum ada foto</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(item => (
                <div key={item.id} className="group relative rounded-xl overflow-hidden border bg-gray-50">
                  <div className="relative h-44 w-full bg-gray-200">
                    <Image src={item.url_foto} alt={item.judul} fill className="object-cover" unoptimized />
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-gray-900 text-sm truncate">{item.judul}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{KATEGORI.find(k => k.value === item.kategori)?.label} · Urutan {item.urutan}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                  >
                    {deletingId === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
