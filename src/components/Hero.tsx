import { Link } from '@tanstack/react-router'

import { SearchBar } from '@/components/SearchBar'
import { useBrand } from '@/lib/useBrand'

export const Hero = () => {
  const brand = useBrand()
  return (
    <section className="relative overflow-hidden px-6.5 pt-17.5 pb-5 text-center">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(700px 320px at 50% -10%,var(--heroglow),transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-[820px]">
        <span className="border-accbd bg-accsoft text-acc2 rounded-pill inline-flex items-center gap-2 border px-2.75 py-1.25 font-mono text-[11px] font-semibold tracking-[0.06em] uppercase">
          {brand.tagline}
        </span>
        <h1 className="text-tx mx-auto mt-5.5 mb-3.5 max-w-[720px] font-sans text-[54px] leading-[1.02] font-extrabold tracking-[-0.035em]">
          Find your next
          <br />
          {brand.heroLine}
        </h1>
        <div className="mx-auto mt-7.5 max-w-[600px]">
          <SearchBar autofocus />
        </div>
        <div className="mx-auto mt-4.5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-fai mr-0.5 font-sans text-[12px] font-medium">Popular</span>
          {brand.topics.map((t) => (
            <Link
              key={t}
              to="/packages"
              search={{ q: t, sort: 'stars' }}
              className="border-chipbd bg-chip text-tx2 hover:border-acc hover:text-acc2 rounded-sm border px-2.5 py-1.25 font-mono text-[12.5px] font-medium transition-colors"
            >
              {t}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
