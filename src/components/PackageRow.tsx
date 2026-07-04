import { Link, useNavigate } from '@tanstack/react-router'

import { formatNumber, formatRelativeDate } from '@/lib/format'
import { kindStyle, ownerInitial } from '@/lib/pkg'
import type { Package } from '@/lib/types'

import { IconStar } from './Icons'

type Props = {
  pkg: Package
}

export const PackageRow = ({ pkg }: Props) => {
  const kind = pkg.kind
  const ks = kindStyle[kind]
  const navigate = useNavigate()

  return (
    <Link
      to="/packages/$owner/$repo"
      params={{ owner: pkg.owner, repo: pkg.name }}
      className="border-bd bg-card hover:border-acc flex flex-col gap-2.25 rounded-[12px] border px-4.5 py-4 transition-colors duration-150"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.25">
          <span className="text-tx truncate font-mono text-[16px] font-bold">{pkg.name}</span>
          {(pkg.version ?? pkg.license) && (
            <span className="border-chipbd bg-chip text-mut shrink-0 rounded-[5px] border px-1.5 py-0.5 font-mono text-[10.5px] font-medium">
              {pkg.version ?? pkg.license}
            </span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              navigate({ to: '/packages', search: { kind, sort: 'stars' } })
            }}
            className="shrink-0 cursor-pointer rounded-[5px] px-1.75 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.05em] uppercase transition-opacity hover:opacity-80"
            style={{ color: ks.color, background: ks.bg }}
          >
            {kind}
          </button>
        </div>
        <span className="text-tx2 flex shrink-0 items-center gap-0.75 font-mono text-[12.5px] font-semibold">
          <IconStar size={12} className="text-tx2" />
          {formatNumber(pkg.stars)}
        </span>
      </div>

      <p className="text-mut max-w-[640px] font-sans text-[13.5px] leading-[1.45]">
        {pkg.description || 'No description provided.'}
      </p>

      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="text-fai flex shrink-0 items-center gap-1.75 font-sans text-[11.5px] font-medium">
            <span className="bg-surf2 text-tx2 flex size-4.5 items-center justify-center rounded-[5px] font-mono text-[9px] font-bold">
              {ownerInitial(pkg.owner)}
            </span>
            {pkg.owner}
          </span>
          <span className="hidden gap-1.5 sm:flex">
            {pkg.topics.slice(0, 2).map((t) => (
              <span
                key={t}
                className="border-bd bg-chip text-fai rounded-[20px] border px-1.75 py-0.5 font-mono text-[10.5px] font-medium"
              >
                {t}
              </span>
            ))}
          </span>
        </div>
        <span className="text-dim shrink-0 font-mono text-[11px] font-medium">
          updated {formatRelativeDate(pkg.pushedAt)}
        </span>
      </div>
    </Link>
  )
}
