import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />
      <main className="flex-1 bg-white dark:bg-slate-900 transition-colors duration-300">{children}</main>
      <Footer />
    </div>
  )
}
