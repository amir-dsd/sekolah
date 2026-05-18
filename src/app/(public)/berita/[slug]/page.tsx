import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

async function getBerita(slug: string) {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('berita')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    return data
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const berita = await getBerita(slug)
  if (!berita) return { title: 'Berita Tidak Ditemukan' }
  return { title: berita.judul, description: berita.ringkasan }
}

const badgeVariantMap: Record<string, 'info' | 'success' | 'warning'> = {
  pengumuman: 'info',
  prestasi: 'success',
  berita: 'warning',
}

export default async function BeritaDetailPage({ params }: Props) {
  const { slug } = await params
  const berita = await getBerita(slug)

  if (!berita) notFound()

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="container mx-auto px-8 py-10 max-w-3xl">
        <Button asChild variant="ghost" className="mb-6 -ml-2">
          <Link href="/berita">
            <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Berita
          </Link>
        </Button>

        <article className="bg-white  rounded-xl shadow-sm overflow-hidden">
          <div className="h-60 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
            <div className="text-6xl">📰</div>
          </div>

          <div className="p-8">
            <Badge variant={badgeVariantMap[berita.kategori] || 'info'} className="mb-4 capitalize">
              {berita.kategori}
            </Badge>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900  mb-4 leading-tight">
              {berita.judul}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-500  mb-6 pb-6 border-b ">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(berita.created_at)}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {berita.penulis}
              </span>
            </div>

            <div
              className="prose prose-gray  max-w-none text-gray-700  leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900  [&_h2]:mt-6 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_p]:mb-4 [&_strong]:text-gray-900 "
              dangerouslySetInnerHTML={{ __html: berita.konten }}
            />
          </div>
        </article>
      </div>
    </div>
  )
}
