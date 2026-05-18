import type { Metadata } from 'next'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { Images } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Galeri',
  description: 'Galeri kegiatan, fasilitas, dan ruang kelas Haya Bina Insani',
}

export const dynamic = 'force-dynamic'

type GaleriItem = {
  id: string
  judul: string
  deskripsi: string | null
  url_foto: string
  kategori: string
}

const kategoriLabel: Record<string, string> = {
  semua: 'Semua',
  kegiatan: 'Kegiatan',
  fasilitas: 'Fasilitas',
  ruang_kelas: 'Ruang Kelas',
}

async function getGaleri(): Promise<GaleriItem[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('galeri')
      .select('id, judul, deskripsi, url_foto, kategori')
      .order('urutan', { ascending: true })
      .order('created_at', { ascending: false })
    return data || []
  } catch {
    return []
  }
}

export default async function GaleriPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>
}) {
  const params = await searchParams
  const aktif = params.kategori || 'semua'
  const semua = await getGaleri()
  const list = aktif === 'semua' ? semua : semua.filter(g => g.kategori === aktif)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="container mx-auto px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Galeri Sekolah</h1>
          <p className="text-green-100 text-lg max-w-xl mx-auto">
            Dokumentasi kegiatan, fasilitas, dan suasana belajar di Haya Bina Insani
          </p>
        </div>
      </section>

      <div className="container mx-auto px-8 py-10">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {Object.entries(kategoriLabel).map(([key, label]) => (
            <a
              key={key}
              href={key === 'semua' ? '/galeri' : `/galeri?kategori=${key}`}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                aktif === key
                  ? 'bg-green-700 text-white border-green-700 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:text-green-700'
              }`}
            >
              {label}
              {key !== 'semua' && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({semua.filter(g => g.kategori === key).length})
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Grid */}
        {list.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Images className="h-14 w-14 mx-auto mb-3 text-gray-200" />
            <p className="font-medium">Belum ada foto di kategori ini</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {list.map((item) => (
              <div key={item.id} className="break-inside-avoid group relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-lg transition-all">
                <div className="relative w-full">
                  <Image
                    src={item.url_foto}
                    alt={item.judul}
                    width={600}
                    height={400}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <p className="text-white font-semibold text-sm">{item.judul}</p>
                    {item.deskripsi && (
                      <p className="text-white/80 text-xs mt-0.5 line-clamp-2">{item.deskripsi}</p>
                    )}
                    <span className="mt-1.5 inline-block text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
                      {kategoriLabel[item.kategori] || item.kategori}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
