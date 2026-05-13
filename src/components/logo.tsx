export function LogoHBI({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield background */}
      <path
        d="M24 2L4 10v14c0 11 8.5 21.3 20 24 11.5-2.7 20-13 20-24V10L24 2z"
        fill="#1d4ed8"
      />
      <path
        d="M24 5L7 12.5v11.5c0 9.5 7.4 18.3 17 20.7 9.6-2.4 17-11.2 17-20.7V12.5L24 5z"
        fill="#2563eb"
      />
      {/* Stars / accent dots */}
      <circle cx="24" cy="14" r="2" fill="#fbbf24" />
      {/* HBI text */}
      <text
        x="24"
        y="32"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill="white"
        fontFamily="system-ui, sans-serif"
        letterSpacing="0.5"
      >
        HBI
      </text>
    </svg>
  )
}
