import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'

import { ThemeToggle } from '@/components/ThemeToggle'
import type { Brand, BrandId } from '@/lib/brands'
import { BRANDS } from '@/lib/brands'

const productionHref = (b: Brand): string => `https://${b.host}`

const localHref = (b: Brand, origin: string): string | null => {
  try {
    const u = new URL(origin)
    if (u.hostname === 'localhost' || u.hostname.endsWith('.localhost')) {
      return `${u.protocol}//${b.id}.localhost${u.port ? `:${u.port}` : ''}`
    }
  } catch {
    return null
  }
  return null
}

const ACCENTS: Record<BrandId, string> = {
  jai: '#c9a75f',
  odin: 'hsl(28, 86%, 52%)',
}

export const LanguageSelect = () => {
  const [origin, setOrigin] = useState<string | null>(null)
  useEffect(() => setOrigin(window.location.origin), [])

  const brands = Object.values(BRANDS)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-15 items-center justify-between px-6.5">
        <span className="text-tx font-sans text-[15px] font-bold tracking-[-0.02em]">
          langpkg<span className="text-acc2 font-semibold">.dev</span>
        </span>
        <ThemeToggle />
      </header>

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6.5 py-10">
        <div className="pointer-events-none absolute inset-0" />
        <div className="relative w-full max-w-[760px] text-center">
          <div className="relative">
            <span className="border-accbd bg-accsoft text-acc2 rounded-pill inline-flex items-center gap-2 border px-2.75 py-1.25 font-mono text-[11px] font-semibold tracking-[0.06em] uppercase">
              Package discovery
            </span>
            <h1 className="text-tx mx-auto mt-5.5 mb-3.5 max-w-[560px] font-sans text-[46px] leading-[1.03] font-extrabold tracking-[-0.035em]">
              Pick your language
            </h1>
            <p className="text-mut mx-auto mb-9 max-w-[440px] font-sans text-[15px]">
              One home for systems-language packages. Choose an ecosystem to browse libraries,
              bindings, and tools with activity, versions, and health at a glance.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {brands.map((b) => {
                const href = (origin && localHref(b, origin)) ?? productionHref(b)
                return (
                  <a
                    key={b.id}
                    href={href}
                    style={{ '--ca': ACCENTS[b.id] } as CSSProperties}
                    className="group border-bd bg-card shadow-card relative flex flex-col items-start gap-4 overflow-hidden rounded-lg border p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:[border-color:var(--ca)]"
                  >
                    <span
                      className="pointer-events-none absolute inset-x-0 top-0 h-0.75 opacity-70"
                      style={{ background: 'var(--ca)' }}
                    />
                    <div
                      className="flex size-11 items-center justify-center rounded-sm font-mono text-[20px] font-extrabold text-white"
                      style={{
                        background:
                          'linear-gradient(135deg,var(--ca),color-mix(in srgb,var(--ca) 60%,#000))',
                      }}
                    >
                      {b.letter}
                    </div>
                    <div>
                      <div className="text-tx font-sans text-[17px] font-bold tracking-[-0.02em]">
                        {b.language}
                      </div>
                      <div className="text-fai font-mono text-[12.5px]">{b.host}</div>
                    </div>
                    <span className="mt-1 font-sans text-[13px] font-semibold [color:var(--fai)] transition-colors group-hover:[color:var(--ca)]">
                      Browse packages →
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
