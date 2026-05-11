import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { createAdminClient } from '@/lib/supabase/admin'
import { formatDate } from '@/lib/utils'
import type { Berita } from '@/types'

export const metadata: Metadata = { title: 'Kelola Berita' }

async function getAllBerita(): Promise<Berita[]> {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('berita')
      .select('*')
      .order('created_at', { ascending: false })
    return data || []
  } catch {
    return []
  }
}

export default async function AdminBeritaPage() {
  const beritaList = await getAllBerita()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin"><ArrowLeft className="h-4 w-4 mr-1" /> Dashboard</Link>
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Kelola Berita</h1>
          </div>
          <Button asChild size="sm" className="bg-blue-700 hover:bg-blue-800">
            <Link href="/admin/berita/tambah">
              <Plus className="h-4 w-4 mr-1" /> Tambah Berita
            </Link>
          </Button>
        </div>
      </div>

      <div className="p-6 max-w-5xl mx-auto">
        {beritaList.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>Belum ada berita.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {beritaList.map((berita) => (
              <Card key={berita.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={berita.published ? 'success' : 'secondary'} className="text-xs">
                          {berita.published ? 'Published' : 'Draft'}
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize">{berita.kategori}</Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 truncate">{berita.judul}</h3>
                      <p className="text-sm text-gray-500 truncate">{berita.ringkasan}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatDate(berita.created_at)} · {berita.penulis}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/berita/${berita.slug}`} target="_blank">Lihat</Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/berita/${berita.id}/edit`}>Edit</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
