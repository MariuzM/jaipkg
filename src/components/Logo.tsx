import { Link } from '@tanstack/react-router'

export const Logo = () => (
  <Link to="/" className="flex items-center gap-2.25">
    <div
      className="text-btx flex items-center justify-center rounded-[7px] font-mono font-extrabold"
      style={{
        width: 26,
        height: 26,
        fontSize: 14,
        background: 'linear-gradient(135deg,var(--acc),color-mix(in srgb,var(--acc) 55%,#fff))',
      }}
    >
      j
    </div>
    <span className="text-tx font-sans text-[15px] font-bold tracking-[-0.02em]">
      jaipkg<span className="text-fai font-semibold">.dev</span>
    </span>
  </Link>
)
