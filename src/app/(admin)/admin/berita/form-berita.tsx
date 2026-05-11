'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import type { Berita } from '@/types'

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function FormBerita({ berita }: { berita?: Berita }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    judul: berita?.judul || '',
    slug: berita?.slug || '',
    ringkasan: berita?.ringkasan || '',
    konten: berita?.konten || '',
    kategori: berita?.kategori || 'berita',
    penulis: berita?.penulis || 'Admin',
    published: berita?.published ?? false,
  })

  const handleJudulChange = (judul: string) => {
    setForm((prev) => ({
      ...prev,
      judul,
      slug: berita ? prev.slug : slugify(judul),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.judul || !form.ringkasan || !form.konten || !form.slug) {
      setError('Judul, ringkasan, konten, dan slug wajib diisi.')
      return
    }
    setIsLoading(true)
    setError('')

    try {
      const supabase = createClient()
      if (berita) {
        await supabase.from('berita').update(form).eq('id', berita.id)
      } else {
        await supabase.from('berita').insert(form)
      }
      router.push('/admin/berita')
      router.refresh()
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="judul">Judul Berita *</Label>
            <Input
              id="judul"
              value={form.judul}
              onChange={(e) => handleJudulChange(e.target.value)}
              placeholder="Judul berita yang menarik"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="slug">Slug (URL) *</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: slugify(e.target.value) }))}
              placeholder="judul-berita-dalam-format-url"
              className="mt-1 font-mono text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">URL: /berita/{form.slug || 'slug'}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Kategori *</Label>
              <Select value={form.kategori} onValueChange={(v) => setForm((p) => ({ ...p, kategori: v as typeof p.kategori }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="berita">Berita</SelectItem>
                  <SelectItem value="pengumuman">Pengumuman</SelectItem>
                  <SelectItem value="prestasi">Prestasi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="penulis">Penulis</Label>
              <Input
                id="penulis"
                value={form.penulis}
                onChange={(e) => setForm((p) => ({ ...p, penulis: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="ringkasan">Ringkasan *</Label>
            <Textarea
              id="ringkasan"
              value={form.ringkasan}
              onChange={(e) => setForm((p) => ({ ...p, ringkasan: e.target.value }))}
              placeholder="Ringkasan singkat berita (1-2 kalimat)"
              rows={3}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="konten">Konten *</Label>
            <Textarea
              id="konten"
              value={form.konten}
              onChange={(e) => setForm((p) => ({ ...p, konten: e.target.value }))}
              placeholder="Konten lengkap berita (mendukung HTML)"
              rows={10}
              className="mt-1 font-mono text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">Mendukung tag HTML: &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={form.published}
              onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
              className="w-4 h-4 text-blue-600"
            />
            <Label htmlFor="published" className="cursor-pointer">
              Publikasikan sekarang
            </Label>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={isLoading} className="bg-blue-700 hover:bg-blue-800">
          {isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Menyimpan...</> : <><Save className="h-4 w-4 mr-2" /> {berita ? 'Simpan Perubahan' : 'Tambah Berita'}</>}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/berita')}>
          Batal
        </Button>
      </div>
    </form>
  )
}
