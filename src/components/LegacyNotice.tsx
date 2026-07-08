import { useEffect, useState } from 'react'

import type { Brand } from '@/lib/brands'

type Props = {
  brand: Brand
}

export const LegacyNotice = ({ brand }: Props) => {
  const [target, setTarget] = useState(`https://${brand.host}`)
  useEffect(() => {
    const { pathname, search } = window.location
    setTarget(`https://${brand.host}${pathname}${search}`)
  }, [brand.host])

  return (
    <div className="flex min-h-screen items-center justify-center px-6.5 py-10">
      <div className="relative w-full max-w-[520px] text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(600px 300px at 50% -20%,var(--heroglow),transparent 70%)',
          }}
        />
        <div className="relative">
          <span className="border-accbd bg-accsoft text-acc2 rounded-pill inline-flex items-center gap-2 border px-2.75 py-1.25 font-mono text-[11px] font-semibold tracking-[0.06em] uppercase">
            We&apos;re moving
          </span>
          <h1 className="text-tx mx-auto mt-5.5 mb-4 max-w-[420px] font-sans text-[34px] leading-[1.08] font-extrabold tracking-[-0.03em]">
            {brand.legacyHost} is moving to a new home
          </h1>
          <p className="text-mut mx-auto mb-2 max-w-[400px] font-sans text-[15px]">
            {brand.language} packages now live at a single domain for all languages.
          </p>
          <div className="text-fai mb-8 flex items-center justify-center gap-2.5 font-mono text-[13px]">
            <span className="line-through">{brand.legacyHost}</span>
            <span>→</span>
            <span className="text-acc2 font-semibold">{brand.host}</span>
          </div>

          <a
            href={target}
            className="bg-acc text-btx inline-flex items-center gap-2 rounded-sm px-5.5 py-3 font-sans text-[14px] font-bold transition-opacity hover:opacity-90"
          >
            Continue to {brand.host} →
          </a>

          <p className="text-dim mt-5 font-sans text-[12px]">
            Please update your bookmarks — {brand.legacyHost} will be retired.
          </p>
        </div>
      </div>
    </div>
  )
}
