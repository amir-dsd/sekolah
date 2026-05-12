import type { Metadata } from 'next'
import { CekStatusForm } from './cek-status-form'

export const metadata: Metadata = {
  title: 'Cek Status Pendaftaran PPDB',
  description: 'Cek status pendaftaran siswa baru SMA Negeri 1 Contoh',
}

export default function StatusPage() {
  return (
    <div className="bg-gray-50  min-h-screen">
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Cek Status Pendaftaran</h1>
          <p className="text-blue-100 text-lg">Masukkan nomor pendaftaran Anda untuk melihat status terkini</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <CekStatusForm />
      </div>
    </div>
  )
}
