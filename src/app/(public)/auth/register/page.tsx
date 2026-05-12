import type { Metadata } from 'next'
import { RegisterForm } from './register-form'

export const metadata: Metadata = {
  title: 'Daftar Akun Siswa',
  description: 'Buat akun untuk mendaftar PPDB SMA Negeri 1 Contoh',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  )
}
