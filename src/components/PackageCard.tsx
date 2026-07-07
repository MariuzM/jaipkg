import { Link, useNavigate } from '@tanstack/react-router'

import { formatNumber, formatRelativeDate } from '@/lib/format'
import { kindStyle, ownerInitial } from '@/lib/pkg'
import type { Package } from '@/lib/types'

import { IconStar } from './Icons'

type Props = {
  pkg: Package
}

export const PackageCard = ({ pkg }: Props) => {
  const kind = pkg.kind
  const ks = kindStyle[kind]
  const navigate = useNavigate()

  return (
    <Link
      to="/packages/$owner/$repo"
      params={{ owner: pkg.owner, repo: pkg.name }}
      className="group border-bd bg-card hover:border-acc flex flex-col gap-2.75 rounded-lg border p-4 transition-all duration-150 hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            navigate({ to: '/packages', search: { kind, sort: 'stars' } })
          }}
          className="cursor-pointer rounded-xs px-1.75 py-0.75 font-mono text-[10px] font-semibold tracking-[0.05em] uppercase transition-opacity hover:opacity-80"
          style={{ color: ks.color, background: ks.bg }}
        >
          {kind}
        </button>
        <span className="text-tx2 flex items-center gap-0.75 font-mono text-[12px] font-semibold">
          <IconStar size={12} className="text-tx2" />
          {formatNumber(pkg.stars)}
        </span>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <span className="text-tx truncate font-mono text-[15.5px] font-bold">{pkg.name}</span>
          {(pkg.version ?? pkg.license) && (
            <span className="border-chipbd bg-chip text-mut shrink-0 rounded-xs border px-1.5 py-0.5 font-mono text-[10.5px] font-medium">
              {pkg.version ?? pkg.license}
            </span>
          )}
        </div>
        <p className="text-mut mt-1.75 line-clamp-2 font-sans text-[13px] leading-[1.45]">
          {pkg.description || 'No description provided.'}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-fai flex items-center gap-1.75 font-sans text-[11.5px] font-medium">
          <span className="bg-surf2 text-tx2 flex size-4.5 items-center justify-center rounded-xs font-mono text-[9px] font-bold">
            {ownerInitial(pkg.owner)}
          </span>
          {pkg.owner}
        </span>
        <span className="text-dim font-mono text-[11px] font-medium">
          updated {formatRelativeDate(pkg.pushedAt)}
        </span>
      </div>
    </Link>
  )
}
