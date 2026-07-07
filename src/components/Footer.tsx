import { useBrand } from '@/lib/useBrand'

import { IconGithub } from './Icons'

export const Footer = () => {
  const brand = useBrand()
  return (
    <footer className="border-bd2 mt-5 border-t">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6.5 py-5.5">
        <span className="text-dim font-sans text-[12px]">
          © 2026 {brand.name} · A focused registry for the {brand.language} community
        </span>
        <a
          href={`https://github.com/${brand.repo}`}
          target="_blank"
          rel="noreferrer"
          className="text-dim hover:text-mut inline-flex items-center gap-1.5 font-mono text-[12px] transition-colors"
        >
          <IconGithub size={13} />
          GitHub
        </a>
      </div>
    </footer>
  )
}
