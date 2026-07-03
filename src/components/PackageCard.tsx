import { formatNumber, formatRelativeDate } from '#/lib/format'
import { deriveKind, kindStyle, ownerInitial } from '#/lib/pkg'
import type { Package } from '#/lib/types'
import { Link } from '@tanstack/react-router'

import { IconStar } from './Icons'

type Props = {
  pkg: Package
}

export const PackageCard = ({ pkg }: Props) => {
  const kind = deriveKind(pkg)
  const ks = kindStyle[kind]

  return (
    <Link
      to="/packages/$owner/$repo"
      params={{ owner: pkg.owner, repo: pkg.name }}
      className="group border-bd bg-card hover:border-acc flex flex-col gap-2.75 rounded-[12px] border p-4 transition-all duration-150 hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between">
        <span
          className="rounded-[5px] px-1.75 py-0.75 font-mono text-[10px] font-semibold tracking-[0.05em] uppercase"
          style={{ color: ks.color, background: ks.bg }}
        >
          {kind}
        </span>
        <span className="text-tx2 flex items-center gap-0.75 font-mono text-[12px] font-semibold">
          <IconStar size={12} className="text-tx2" />
          {formatNumber(pkg.stars)}
        </span>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <span className="text-tx truncate font-mono text-[15.5px] font-bold">{pkg.name}</span>
          {(pkg.version ?? pkg.license) && (
            <span className="border-chipbd bg-chip text-mut shrink-0 rounded-[5px] border px-1.5 py-0.5 font-mono text-[10.5px] font-medium">
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
          <span className="bg-surf2 text-tx2 flex size-4.5 items-center justify-center rounded-[5px] font-mono text-[9px] font-bold">
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
