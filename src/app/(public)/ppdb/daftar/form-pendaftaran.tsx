'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, Loader2, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'

const schema = z.object({
  nama_lengkap: z.string().min(3, 'Nama minimal 3 karakter'),
  nik: z.string().length(16, 'NIK harus 16 digit').regex(/^\d+$/, 'NIK hanya angka'),
  nisn: z.string().optional(),
  tempat_lahir: z.string().min(2, 'Tempat lahir wajib diisi'),
  tanggal_lahir: z.string().min(1, 'Tanggal lahir wajib diisi'),
  jenis_kelamin: z.string().min(1, 'Jenis kelamin wajib dipilih'),
  agama: z.string().min(1, 'Agama wajib dipilih'),
  alamat: z.string().min(10, 'Alamat minimal 10 karakter'),
  kelurahan: z.string().optional(),
  kecamatan: z.string().optional(),
  kota: z.string().min(2, 'Kota wajib diisi'),
  provinsi: z.string().min(2, 'Provinsi wajib diisi'),
  kode_pos: z.string().optional(),
  no_telepon: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  email: z.string().email('Format email tidak valid'),
  asal_sekolah: z.string().min(3, 'Nama sekolah asal wajib diisi'),
  npsn_sekolah: z.string().optional(),
  tahun_lulus: z.string().min(1, 'Tahun lulus wajib diisi'),
  nama_ayah: z.string().min(2, 'Nama ayah wajib diisi'),
  pekerjaan_ayah: z.string().optional(),
  nama_ibu: z.string().min(2, 'Nama ibu wajib diisi'),
  pekerjaan_ibu: z.string().optional(),
  no_telepon_ortu: z.string().min(10, 'Nomor telepon orang tua wajib diisi'),
  penghasilan_ortu: z.string().optional(),
  pilihan_jurusan_1: z.string().min(1, 'Pilihan jurusan 1 wajib dipilih'),
  pilihan_jurusan_2: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const steps = [
  { id: 1, label: 'Data Diri' },
  { id: 2, label: 'Alamat' },
  { id: 3, label: 'Asal Sekolah' },
  { id: 4, label: 'Data Orang Tua' },
  { id: 5, label: 'Jurusan' },
]

export function FormPendaftaran({ tahunAjaran }: { tahunAjaran: string }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; nomor?: string; error?: string } | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { jenis_kelamin: '', agama: '', pilihan_jurusan_1: '' },
  })

  const { register, handleSubmit, formState: { errors }, setValue, trigger, watch } = form

  const validateStep = async () => {
    const fieldsByStep: Record<number, (keyof FormData)[]> = {
      1: ['nama_lengkap', 'nik', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'agama', 'no_telepon', 'email'],
      2: ['alamat', 'kota', 'provinsi'],
      3: ['asal_sekolah', 'tahun_lulus'],
      4: ['nama_ayah', 'nama_ibu', 'no_telepon_ortu'],
      5: ['pilihan_jurusan_1'],
    }
    return trigger(fieldsByStep[step])
  }

  const nextStep = async () => {
    const valid = await validateStep()
    if (valid) setStep((s) => Math.min(s + 1, 5))
  }

  const prevStep = () => setStep((s) => Math.max(s - 1, 1))

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const supabase = createClient()

      const jumlahQuery = await supabase
        .from('pendaftaran')
        .select('*', { count: 'exact', head: true })
        .eq('tahun_ajaran', tahunAjaran)

      const urutan = ((jumlahQuery.count || 0) + 1).toString().padStart(4, '0')
      const nomorPendaftaran = `PPDB-${tahunAjaran.replace('/', '')}-${urutan}`

      const { error } = await supabase.from('pendaftaran').insert({
        ...data,
        tahun_lulus: parseInt(data.tahun_lulus),
        nomor_pendaftaran: nomorPendaftaran,
        tahun_ajaran: tahunAjaran,
        status: 'menunggu',
      })

      if (error) throw error

      setSubmitResult({ success: true, nomor: nomorPendaftaran })
    } catch (err) {
      setSubmitResult({ success: false, error: 'Terjadi kesalahan. Silakan coba lagi.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitResult?.success) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-gray-600 dark:text-slate-400 mb-4">Nomor pendaftaran Anda adalah:</p>
          <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-700 rounded-xl px-8 py-4 inline-block mb-6">
            <span className="text-2xl font-black text-blue-700 dark:text-blue-400 tracking-wider">{submitResult.nomor}</span>
          </div>
          <p className="text-gray-500 dark:text-slate-400 text-sm mb-8 max-w-md mx-auto">
            Simpan nomor pendaftaran ini. Gunakan nomor tersebut untuk memantau status pendaftaran Anda.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => router.push('/ppdb/status')} className="bg-blue-700 hover:bg-blue-800">
              Cek Status Pendaftaran
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              Kembali ke Beranda
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className={`flex items-center gap-2 ${step >= s.id ? 'text-blue-700' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                step > s.id ? 'bg-blue-700 border-blue-700 text-white' :
                step === s.id ? 'border-blue-700 text-blue-700' :
                'border-gray-300 text-gray-400'
              }`}>
                {step > s.id ? '✓' : s.id}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${step >= s.id ? 'text-blue-700' : 'text-gray-400'}`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 w-8 sm:w-12 mx-2 transition-all ${step > s.id ? 'bg-blue-700' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-800 dark:text-blue-400">
            Langkah {step}: {steps[step - 1].label}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Step 1: Data Diri */}
          {step === 1 && (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="nama_lengkap">Nama Lengkap <span className="text-red-500">*</span></Label>
                  <Input id="nama_lengkap" {...register('nama_lengkap')} placeholder="Sesuai akta kelahiran" className="mt-1" />
                  {errors.nama_lengkap && <p className="text-red-500 text-xs mt-1">{errors.nama_lengkap.message}</p>}
                </div>
                <div>
                  <Label htmlFor="nik">NIK <span className="text-red-500">*</span></Label>
                  <Input id="nik" {...register('nik')} placeholder="16 digit" maxLength={16} className="mt-1" />
                  {errors.nik && <p className="text-red-500 text-xs mt-1">{errors.nik.message}</p>}
                </div>
                <div>
                  <Label htmlFor="nisn">NISN</Label>
                  <Input id="nisn" {...register('nisn')} placeholder="Nomor Induk Siswa Nasional" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="tempat_lahir">Tempat Lahir <span className="text-red-500">*</span></Label>
                  <Input id="tempat_lahir" {...register('tempat_lahir')} placeholder="Nama kota" className="mt-1" />
                  {errors.tempat_lahir && <p className="text-red-500 text-xs mt-1">{errors.tempat_lahir.message}</p>}
                </div>
                <div>
                  <Label htmlFor="tanggal_lahir">Tanggal Lahir <span className="text-red-500">*</span></Label>
                  <Input id="tanggal_lahir" type="date" {...register('tanggal_lahir')} className="mt-1" />
                  {errors.tanggal_lahir && <p className="text-red-500 text-xs mt-1">{errors.tanggal_lahir.message}</p>}
                </div>
                <div>
                  <Label>Jenis Kelamin <span className="text-red-500">*</span></Label>
                  <Select onValueChange={(v) => setValue('jenis_kelamin', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="Perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.jenis_kelamin && <p className="text-red-500 text-xs mt-1">{errors.jenis_kelamin.message}</p>}
                </div>
                <div>
                  <Label>Agama <span className="text-red-500">*</span></Label>
                  <Select onValueChange={(v) => setValue('agama', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih agama" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'].map((a) => (
                        <SelectItem key={a} value={a}>{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.agama && <p className="text-red-500 text-xs mt-1">{errors.agama.message}</p>}
                </div>
                <div>
                  <Label htmlFor="no_telepon">No. Telepon / HP <span className="text-red-500">*</span></Label>
                  <Input id="no_telepon" {...register('no_telepon')} placeholder="08xx-xxxx-xxxx" className="mt-1" />
                  {errors.no_telepon && <p className="text-red-500 text-xs mt-1">{errors.no_telepon.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input id="email" type="email" {...register('email')} placeholder="email@contoh.com" className="mt-1" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
            </>
          )}

          {/* Step 2: Alamat */}
          {step === 2 && (
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="alamat">Alamat Lengkap <span className="text-red-500">*</span></Label>
                <Textarea id="alamat" {...register('alamat')} placeholder="Nama jalan, nomor rumah, RT/RW" className="mt-1" />
                {errors.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat.message}</p>}
              </div>
              <div>
                <Label htmlFor="kelurahan">Kelurahan / Desa</Label>
                <Input id="kelurahan" {...register('kelurahan')} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="kecamatan">Kecamatan</Label>
                <Input id="kecamatan" {...register('kecamatan')} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="kota">Kota / Kabupaten <span className="text-red-500">*</span></Label>
                <Input id="kota" {...register('kota')} className="mt-1" />
                {errors.kota && <p className="text-red-500 text-xs mt-1">{errors.kota.message}</p>}
              </div>
              <div>
                <Label htmlFor="provinsi">Provinsi <span className="text-red-500">*</span></Label>
                <Input id="provinsi" {...register('provinsi')} className="mt-1" />
                {errors.provinsi && <p className="text-red-500 text-xs mt-1">{errors.provinsi.message}</p>}
              </div>
              <div>
                <Label htmlFor="kode_pos">Kode Pos</Label>
                <Input id="kode_pos" {...register('kode_pos')} maxLength={5} className="mt-1" />
              </div>
            </div>
          )}

          {/* Step 3: Asal Sekolah */}
          {step === 3 && (
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="asal_sekolah">Nama SMP Asal <span className="text-red-500">*</span></Label>
                <Input id="asal_sekolah" {...register('asal_sekolah')} placeholder="Contoh: SMP Negeri 1 Kota" className="mt-1" />
                {errors.asal_sekolah && <p className="text-red-500 text-xs mt-1">{errors.asal_sekolah.message}</p>}
              </div>
              <div>
                <Label htmlFor="npsn_sekolah">NPSN Sekolah Asal</Label>
                <Input id="npsn_sekolah" {...register('npsn_sekolah')} placeholder="8 digit" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="tahun_lulus">Tahun Lulus <span className="text-red-500">*</span></Label>
                <Select onValueChange={(v) => setValue('tahun_lulus', v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih tahun lulus" />
                  </SelectTrigger>
                  <SelectContent>
                    {[2025, 2024, 2023, 2022].map((y) => (
                      <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.tahun_lulus && <p className="text-red-500 text-xs mt-1">{errors.tahun_lulus.message}</p>}
              </div>
            </div>
          )}

          {/* Step 4: Data Orang Tua */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-slate-200 mb-3 pb-2 border-b dark:border-slate-700">Data Ayah</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nama_ayah">Nama Ayah <span className="text-red-500">*</span></Label>
                    <Input id="nama_ayah" {...register('nama_ayah')} className="mt-1" />
                    {errors.nama_ayah && <p className="text-red-500 text-xs mt-1">{errors.nama_ayah.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="pekerjaan_ayah">Pekerjaan Ayah</Label>
                    <Input id="pekerjaan_ayah" {...register('pekerjaan_ayah')} className="mt-1" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-slate-200 mb-3 pb-2 border-b dark:border-slate-700">Data Ibu</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nama_ibu">Nama Ibu <span className="text-red-500">*</span></Label>
                    <Input id="nama_ibu" {...register('nama_ibu')} className="mt-1" />
                    {errors.nama_ibu && <p className="text-red-500 text-xs mt-1">{errors.nama_ibu.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="pekerjaan_ibu">Pekerjaan Ibu</Label>
                    <Input id="pekerjaan_ibu" {...register('pekerjaan_ibu')} className="mt-1" />
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="no_telepon_ortu">No. Telepon Orang Tua <span className="text-red-500">*</span></Label>
                  <Input id="no_telepon_ortu" {...register('no_telepon_ortu')} placeholder="08xx-xxxx-xxxx" className="mt-1" />
                  {errors.no_telepon_ortu && <p className="text-red-500 text-xs mt-1">{errors.no_telepon_ortu.message}</p>}
                </div>
                <div>
                  <Label>Penghasilan Orang Tua per Bulan</Label>
                  <Select onValueChange={(v) => setValue('penghasilan_ortu', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih kisaran penghasilan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="< 1 juta">Kurang dari Rp 1.000.000</SelectItem>
                      <SelectItem value="1-3 juta">Rp 1.000.000 - Rp 3.000.000</SelectItem>
                      <SelectItem value="3-5 juta">Rp 3.000.000 - Rp 5.000.000</SelectItem>
                      <SelectItem value="5-10 juta">Rp 5.000.000 - Rp 10.000.000</SelectItem>
                      <SelectItem value="> 10 juta">Lebih dari Rp 10.000.000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Pilihan Jurusan */}
          {step === 5 && (
            <div className="space-y-5">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg p-4 text-sm text-blue-700 dark:text-blue-300">
                Pilih jurusan sesuai minat dan kemampuan. Jika pilihan pertama penuh, sistem akan mempertimbangkan pilihan kedua.
              </div>
              <div>
                <Label>Pilihan Jurusan 1 <span className="text-red-500">*</span></Label>
                <Select onValueChange={(v) => setValue('pilihan_jurusan_1', v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih jurusan pertama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MIPA">MIPA (Matematika & Ilmu Pengetahuan Alam)</SelectItem>
                    <SelectItem value="IPS">IPS (Ilmu Pengetahuan Sosial)</SelectItem>
                    <SelectItem value="Bahasa">Bahasa dan Budaya</SelectItem>
                  </SelectContent>
                </Select>
                {errors.pilihan_jurusan_1 && <p className="text-red-500 text-xs mt-1">{errors.pilihan_jurusan_1.message}</p>}
              </div>
              <div>
                <Label>Pilihan Jurusan 2 (Opsional)</Label>
                <Select onValueChange={(v) => setValue('pilihan_jurusan_2', v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih jurusan alternatif" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MIPA">MIPA (Matematika & Ilmu Pengetahuan Alam)</SelectItem>
                    <SelectItem value="IPS">IPS (Ilmu Pengetahuan Sosial)</SelectItem>
                    <SelectItem value="Bahasa">Bahasa dan Budaya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ringkasan */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border dark:border-slate-700">
                <h3 className="font-semibold text-gray-800 dark:text-slate-200 mb-2">Ringkasan Data</h3>
                <div className="grid sm:grid-cols-2 gap-2 text-sm">
                  <div><span className="text-gray-500 dark:text-slate-400">Nama:</span> <span className="font-medium dark:text-slate-200">{watch('nama_lengkap') || '-'}</span></div>
                  <div><span className="text-gray-500 dark:text-slate-400">NIK:</span> <span className="font-medium dark:text-slate-200">{watch('nik') || '-'}</span></div>
                  <div><span className="text-gray-500 dark:text-slate-400">Asal Sekolah:</span> <span className="font-medium dark:text-slate-200">{watch('asal_sekolah') || '-'}</span></div>
                  <div><span className="text-gray-500 dark:text-slate-400">Email:</span> <span className="font-medium dark:text-slate-200">{watch('email') || '-'}</span></div>
                </div>
              </div>

              {submitResult?.error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg text-red-700 dark:text-red-400 text-sm">
                  {submitResult.error}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
          <ChevronLeft className="h-4 w-4 mr-1" /> Sebelumnya
        </Button>
        {step < 5 ? (
          <Button type="button" onClick={nextStep} className="bg-blue-700 hover:bg-blue-800">
            Selanjutnya <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
            {isSubmitting ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Mengirim...</>
            ) : (
              <><CheckCircle className="h-4 w-4 mr-2" /> Kirim Pendaftaran</>
            )}
          </Button>
        )}
      </div>
    </form>
  )
}
