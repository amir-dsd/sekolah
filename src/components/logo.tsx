import Image from 'next/image'

export function LogoHBI({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo-hbi.png"
      alt="Logo Raudatul Athfal Haya Bina Insani"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      priority
    />
  )
}
