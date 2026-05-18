import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Megaphone, Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import type { Berita, KategoriBerita } from '@/types'

export const metadata: Metadata = {
  title: 'Berita & Pengumuman',
  description: 'Informasi terkini dari Haya Bina Insani',
}

async function getAllBerita(): Promise<Berita[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('berita')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
    return data || []
  } catch {
    return []
  }
}

const kategoriConfig: Record<KategoriBerita, { label: string; icon: React.ElementType; variant: 'info' | 'success' | 'warning' }> = {
  berita: { label: 'Berita', icon: BookOpen, variant: 'warning' },
  pengumuman: { label: 'Pengumuman', icon: Megaphone, variant: 'info' },
  prestasi: { label: 'Prestasi', icon: Trophy, variant: 'success' },
}

export default async function BeritaPage() {
  const beritaList = await getAllBerita()

  const pengumuman = beritaList.filter((b) => b.kategori === 'pengumuman')
  const beritaBiasa = beritaList.filter((b) => b.kategori !== 'pengumuman')

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="container mx-auto px-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8" />
            <h1 className="text-3xl md:text-4xl font-bold">Berita & Pengumuman</h1>
          </div>
          <p className="text-green-100 text-lg">Informasi terkini dari Haya Bina Insani</p>
        </div>
      </section>

      <div className="container mx-auto px-8 py-12">
        {/* Pengumuman Terbaru */}
        {pengumuman.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Megaphone className="h-5 w-5 text-green-700 " />
              <h2 className="text-xl font-bold text-gray-900 ">Pengumuman Terbaru</h2>
            </div>
            <div className="space-y-3">
              {pengumuman.slice(0, 3).map((berita) => (
                <Link key={berita.id} href={`/berita/${berita.slug}`}>
                  <div className="flex items-center gap-4 p-4 bg-green-50  border border-green-100  rounded-lg hover:border-green-300  hover:shadow-sm transition-all">
                    <div className="w-8 h-8 bg-green-100  rounded-full flex items-center justify-center shrink-0">
                      <Megaphone className="h-4 w-4 text-green-700 " />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900  truncate">{berita.judul}</p>
                      <p className="text-xs text-gray-500 ">{formatDate(berita.created_at)}</p>
                    </div>
                    <span className="text-green-700  text-sm shrink-0">Baca →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Semua Berita */}
        <div>
          <h2 className="text-xl font-bold text-gray-900  mb-6">Semua Berita</h2>
          {beritaList.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beritaList.map((berita) => {
                const config = kategoriConfig[berita.kategori] || kategoriConfig.berita
                const Icon = config.icon
                return (
                  <Card key={berita.id} className="hover:shadow-md transition-shadow overflow-hidden">
                    <div className="h-40 bg-gradient-to-br from-green-50 to-green-100   flex items-center justify-center">
                      <Icon className="h-14 w-14 text-green-300 " />
                    </div>
                    <CardHeader className="pb-2">
                      <Badge variant={config.variant} className="w-fit mb-2 capitalize">
                        {config.label}
                      </Badge>
                      <CardTitle className="text-base line-clamp-2 leading-snug">
                        {berita.judul}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500  text-sm line-clamp-2 mb-4">{berita.ringkasan}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400  text-xs">{formatDate(berita.created_at)}</span>
                        <Link href={`/berita/${berita.slug}`} className="text-green-700  hover:underline font-medium text-sm">
                          Baca selengkapnya →
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400 ">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-200 " />
              <p className="text-lg">Belum ada berita tersedia.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
