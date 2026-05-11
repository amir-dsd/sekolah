import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormBerita } from '../form-berita'

export const metadata: Metadata = { title: 'Tambah Berita' }

export default function TambahBeritaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/berita"><ArrowLeft className="h-4 w-4 mr-1" /> Kembali</Link>
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Tambah Berita Baru</h1>
        </div>
      </div>
      <div className="p-6 max-w-3xl mx-auto">
        <FormBerita />
      </div>
    </div>
  )
}
