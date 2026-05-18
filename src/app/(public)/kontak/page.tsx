import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Hubungi Haya Bina Insani',
}

export default function KontakPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="container mx-auto px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Hubungi Kami</h1>
          <p className="text-green-100 text-lg">Kami siap membantu pertanyaan Anda tentang sekolah dan PPDB</p>
        </div>
      </section>

      <section className="py-16 bg-white ">
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 ">Informasi Kontak</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50  rounded-xl">
                  <div className="w-10 h-10 bg-green-100  rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-green-700 " />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 ">Alamat</h3>
                    <p className="text-gray-600  text-sm mt-1">Jl. Pendidikan No. 1, Kecamatan Pusat,<br />Kota Contoh, Provinsi Contoh 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50  rounded-xl">
                  <div className="w-10 h-10 bg-green-100  rounded-full flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-green-700 " />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 ">Telepon</h3>
                    <p className="text-gray-600  text-sm mt-1">(021) 1234-5678</p>
                    <p className="text-gray-600  text-sm">WhatsApp: 0812-3456-7890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50  rounded-xl">
                  <div className="w-10 h-10 bg-green-100  rounded-full flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-green-700 " />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 ">Email</h3>
                    <p className="text-gray-600  text-sm mt-1">info@hayabinainsani.sch.id</p>
                    <p className="text-gray-600  text-sm">ppdb@hayabinainsani.sch.id (khusus PPDB)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50  rounded-xl">
                  <div className="w-10 h-10 bg-green-100  rounded-full flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-green-700 " />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 ">Jam Operasional</h3>
                    <p className="text-gray-600  text-sm mt-1">Senin – Kamis: 07.00 – 15.30 WIB</p>
                    <p className="text-gray-600  text-sm">Jumat: 07.00 – 11.30 WIB</p>
                    <p className="text-gray-600  text-sm">Sabtu & Minggu: Tutup</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900  mb-3">Media Sosial</h3>
                <div className="flex gap-3">
                  {[
                    { label: 'Facebook', handle: '@hayabinainsani' },
                    { label: 'Instagram', handle: '@hayabinainsani' },
                    { label: 'YouTube', handle: 'Haya Bina Insani' },
                  ].map(({ label, handle }) => (
                    <div key={label} className="flex flex-col items-center bg-gray-100  rounded-lg px-3 py-2">
                      <span className="text-xs font-semibold text-green-700 ">{label}</span>
                      <span className="text-xs text-gray-500 ">{handle}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Kirim Pesan</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700  mb-1">Nama</label>
                        <input
                          type="text"
                          placeholder="Nama Anda"
                          className="w-full px-3 py-2 border border-gray-300  rounded-md text-sm bg-white  text-gray-900  placeholder:text-gray-400  focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700  mb-1">Email</label>
                        <input
                          type="email"
                          placeholder="email@contoh.com"
                          className="w-full px-3 py-2 border border-gray-300  rounded-md text-sm bg-white  text-gray-900  placeholder:text-gray-400  focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700  mb-1">Subjek</label>
                      <input
                        type="text"
                        placeholder="Perihal pesan"
                        className="w-full px-3 py-2 border border-gray-300  rounded-md text-sm bg-white  text-gray-900  placeholder:text-gray-400  focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700  mb-1">Pesan</label>
                      <textarea
                        rows={5}
                        placeholder="Tulis pesan Anda di sini..."
                        className="w-full px-3 py-2 border border-gray-300  rounded-md text-sm bg-white  text-gray-900  placeholder:text-gray-400  focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition-colors font-medium text-sm"
                    >
                      Kirim Pesan
                    </button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Peta */}
      <section className="bg-gray-100  py-12">
        <div className="container mx-auto px-8">
          <h2 className="text-xl font-bold text-gray-900  mb-6 text-center">Lokasi Sekolah</h2>
          <div className="bg-gray-200  rounded-xl h-64 flex items-center justify-center border ">
            <div className="text-center text-gray-500 ">
              <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-400 " />
              <p>Peta akan ditampilkan di sini</p>
              <p className="text-sm">Integrasikan dengan Google Maps Embed API</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
