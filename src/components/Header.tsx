import { Link } from '@tanstack/react-router'

import { useBrand } from '@/lib/useBrand'

import { IconGithub } from './Icons'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

export const Header = () => {
  const brand = useBrand()
  return (
    <header
      className="border-bd sticky top-0 z-20 flex h-15 items-center justify-between border-b px-6.5"
      style={{
        background: 'color-mix(in srgb,var(--bg) 82%,transparent)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center gap-3.5">
        <Logo />
        <span className="border-chipbd bg-chip text-mut rounded-pill hidden items-center gap-1.75 border px-2 py-1 font-mono text-[10.5px] sm:inline-flex">
          <span
            className="bg-ok size-1.5 rounded-full"
            style={{ animation: 'pulse 2.4s infinite' }}
          />
          auto-synced hourly
        </span>
      </div>

      <div className="flex items-center gap-5.5">
        <nav className="text-mut flex gap-5.5 font-sans text-[13.5px] font-medium">
          <Link
            to="/packages"
            search={{ sort: 'stars' }}
            className="hover:text-tx transition-colors"
            activeProps={{ className: 'text-tx' }}
          >
            Browse
          </Link>
          <Link
            to="/about"
            className="hover:text-tx transition-colors"
            activeProps={{ className: 'text-tx' }}
          >
            About
          </Link>
        </nav>
        <div className="bg-bd h-5 w-px" />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={`https://github.com/${brand.repo}`}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="border-chipbd bg-chip text-mut hover:border-acc hover:text-tx flex size-7.5 items-center justify-center rounded-sm border transition"
          >
            <IconGithub />
          </a>
        </div>
      </div>
    </header>
  )
}
