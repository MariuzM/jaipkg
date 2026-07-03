import { formatNumber } from '#/lib/format'
import type { Stats } from '#/lib/types'
import type { ReactNode } from 'react'

type Props = {
  stats: Stats
}

const PackageIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
  </svg>
)

const StarIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.1 20.9l1.1-6.5L2.5 9.8l6.5-.9L12 2.5z" />
  </svg>
)

const AuthorIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
  </svg>
)

export const StatsStrip = ({ stats }: Props) => {
  const cells: { value: string; label: string; icon: ReactNode }[] = [
    { value: formatNumber(stats.totalPackages), label: 'Packages', icon: <PackageIcon /> },
    { value: formatNumber(stats.totalStars), label: 'Total stars', icon: <StarIcon /> },
    { value: formatNumber(stats.topContributors), label: 'Authors', icon: <AuthorIcon /> },
  ]

  return (
    <div>
      <div className="mx-auto grid max-w-[860px] grid-cols-3 gap-8 px-6 py-3.5">
        {cells.map((c) => (
          <div key={c.label} className="flex items-center justify-center gap-3.5 py-5.5">
            <div className="border-accbd bg-accsoft text-acc2 flex size-10.5 flex-none items-center justify-center rounded-[11px] border">
              {c.icon}
            </div>
            <div className="min-w-0">
              <div className="text-tx font-mono text-[26px] leading-[1.05] font-bold tracking-[-0.02em] tabular-nums">
                {c.value}
              </div>
              <div className="text-fai mt-0.75 font-sans text-[11.5px] font-medium tracking-[0.01em]">
                {c.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
