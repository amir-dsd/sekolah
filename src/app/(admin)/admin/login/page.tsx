import type { Metadata } from 'next'
import { LoginForm } from './login-form'
import { LogoHBI } from '@/components/logo'

export const metadata: Metadata = { title: 'Admin Login' }

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <LogoHBI size={64} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">Haya Bina Insani</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
