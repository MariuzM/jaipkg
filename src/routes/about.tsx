import type { ReactNode } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { IconExternalLink } from '@/components/Icons'
import {
  IconBun,
  IconDrizzle,
  IconEslint,
  IconPostgres,
  IconPrettier,
  IconReact,
  IconTailwind,
  IconTypeScript,
  IconVercel,
  IconVite,
} from '@/components/StackIcons'
import { BRANDS } from '@/lib/brands'
import { useBrand } from '@/lib/useBrand'

type Tech = {
  name: string
  role: string
  url: string
  color: string
  Icon?: (p: { size?: number; className?: string }) => ReactNode
  img?: string
}

type TechGroup = {
  title: string
  items: Array<Tech>
}

const GROUPS: Array<TechGroup> = [
  {
    title: 'Framework & UI',
    items: [
      {
        name: 'React',
        role: 'UI library',
        url: 'https://react.dev',
        color: '#61DAFB',
        Icon: IconReact,
      },
      {
        name: 'TanStack Start',
        role: 'Full-stack framework',
        url: 'https://tanstack.com/start',
        color: '#ffffff',
        img: '/logos/tanstack.png',
      },
      {
        name: 'Vite',
        role: 'Build tool',
        url: 'https://vite.dev',
        color: '#646CFF',
        Icon: IconVite,
      },
      {
        name: 'Tailwind CSS',
        role: 'Styling',
        url: 'https://tailwindcss.com',
        color: '#06B6D4',
        Icon: IconTailwind,
      },
    ],
  },
  {
    title: 'Language & Quality',
    items: [
      {
        name: 'TypeScript',
        role: 'Language',
        url: 'https://www.typescriptlang.org',
        color: '#3178C6',
        Icon: IconTypeScript,
      },
      {
        name: 'ESLint',
        role: 'Linting',
        url: 'https://eslint.org',
        color: '#4B32C3',
        Icon: IconEslint,
      },
      {
        name: 'Prettier',
        role: 'Formatting',
        url: 'https://prettier.io',
        color: '#F7B93E',
        Icon: IconPrettier,
      },
    ],
  },
  {
    title: 'Data & Runtime',
    items: [
      {
        name: 'Drizzle ORM',
        role: 'Type-safe SQL',
        url: 'https://orm.drizzle.team',
        color: '#C5F74F',
        Icon: IconDrizzle,
      },
      {
        name: 'PostgreSQL',
        role: 'Database',
        url: 'https://www.postgresql.org',
        color: '#4169E1',
        Icon: IconPostgres,
      },
      {
        name: 'Bun',
        role: 'Runtime & package manager',
        url: 'https://bun.sh',
        color: '#F472B6',
        Icon: IconBun,
      },
      {
        name: 'Nitro',
        role: 'Server engine',
        url: 'https://nitro.build',
        color: '#31B2F3',
        img: '/logos/nitro.svg',
      },
      {
        name: 'Vercel',
        role: 'Hosting',
        url: 'https://vercel.com',
        color: 'var(--tx)',
        Icon: IconVercel,
      },
    ],
  },
]

export const Route = createFileRoute('/about')({
  head: ({ match }) => ({
    meta: [
      { title: `About — ${match.context.brand.host}` },
      {
        name: 'description',
        content: `About ${match.context.brand.host} and the open-source stack that powers it.`,
      },
    ],
  }),
  component: About,
})

function About() {
  const brand = useBrand()
  const others = Object.values(BRANDS).filter((b) => b.id !== brand.id)
  return (
    <div className="pb-14">
      <section className="relative overflow-hidden px-6.5 pt-17.5 pb-5 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(700px 320px at 50% -10%,var(--heroglow),transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-[680px]">
          <span className="border-accbd bg-accsoft text-acc2 rounded-pill inline-flex items-center gap-2 border px-2.75 py-1.25 font-mono text-[11px] font-semibold tracking-[0.06em] uppercase">
            About
          </span>
          <h1 className="text-tx mx-auto mt-5.5 mb-4 max-w-[560px] font-sans text-[42px] leading-[1.05] font-extrabold tracking-[-0.035em]">
            Built for {brand.language} community
          </h1>
        </div>
      </section>

      {others.length > 0 && (
        <section className="mx-auto mt-4 max-w-[1000px] px-6.5">
          <div className="text-fai mb-4 font-mono text-[11px] font-bold tracking-[0.07em] uppercase">
            Also available for
          </div>
          <div className="flex flex-wrap gap-3">
            {others.map((b) => (
              <a
                key={b.id}
                href={`https://${b.host}`}
                target="_blank"
                rel="noreferrer"
                className="group border-bd bg-card hover:border-acc shadow-card flex items-center gap-3.5 rounded-lg border px-4.5 py-3.5 transition-colors"
              >
                <span className="border-chipbd bg-chip text-tx flex size-9 items-center justify-center rounded-sm font-mono text-[16px] font-extrabold">
                  {b.letter}
                </span>
                <span className="flex flex-col">
                  <span className="text-tx group-hover:text-acc2 font-sans text-[14px] font-semibold transition-colors">
                    {b.host}
                  </span>
                  <span className="text-fai font-sans text-[12px]">{b.language} packages</span>
                </span>
                <IconExternalLink
                  size={13}
                  className="text-fai group-hover:text-acc2 ml-1.5 transition-colors"
                />
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto mt-10 flex max-w-[1000px] flex-col gap-11 px-6.5">
        {GROUPS.map((group) => (
          <div key={group.title}>
            <div className="text-fai mb-4 font-mono text-[11px] font-bold tracking-[0.07em] uppercase">
              {group.title}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {group.items.map((tech) => (
                <TechTile key={tech.name} tech={tech} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

type TechTileProps = {
  tech: Tech
}

const TechTile = ({ tech }: TechTileProps) => (
  <a
    href={tech.url}
    target="_blank"
    rel="noreferrer"
    style={{ '--brand': tech.color } as React.CSSProperties}
    className="group border-bd bg-card hover:border-acc shadow-card relative flex flex-col items-center gap-3.5 rounded-lg border px-4 py-7 transition-colors"
  >
    <span className="text-fai absolute top-2.5 right-2.5 opacity-0 transition-opacity group-hover:opacity-100">
      <IconExternalLink size={13} />
    </span>
    <span className="flex h-9 items-center justify-center">
      {tech.Icon ? (
        <tech.Icon
          size={34}
          className="text-fai transition-colors duration-300 group-hover:text-[var(--brand)]"
        />
      ) : (
        <img
          src={tech.img}
          alt=""
          width={34}
          height={34}
          className="size-[34px] object-contain opacity-55 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
        />
      )}
    </span>
    <span className="flex flex-col items-center gap-0.5">
      <span className="text-tx2 group-hover:text-tx font-sans text-[13.5px] font-semibold transition-colors">
        {tech.name}
      </span>
      <span className="text-fai font-sans text-[11.5px] font-medium">{tech.role}</span>
    </span>
  </a>
)
