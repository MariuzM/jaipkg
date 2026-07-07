import { Link } from '@tanstack/react-router'

import { useBrand } from '@/lib/useBrand'

export const Logo = () => {
  const brand = useBrand()
  return (
    <Link to="/" className="flex items-center gap-2.25">
      <div
        className="text-btx flex items-center justify-center rounded-sm font-mono font-extrabold"
        style={{
          width: 26,
          height: 26,
          fontSize: 14,
          background: 'linear-gradient(135deg,var(--acc),color-mix(in srgb,var(--acc) 55%,#fff))',
        }}
      >
        {brand.letter}
      </div>
      <span className="text-tx font-sans text-[15px] font-bold tracking-[-0.02em]">
        {brand.name}
        <span className="text-fai font-semibold">.dev</span>
      </span>
    </Link>
  )
}
