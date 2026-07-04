import { Link } from '@tanstack/react-router'

import { formatRelativeDate } from '@/lib/format'
import type { Package } from '@/lib/types'

type Props = {
  newest: Array<Package>
}

export const NewestRail = ({ newest }: Props) => (
  <div className="flex flex-col gap-6.5 px-5.5 py-7">
    <div>
      <div className="text-fai mb-3.5 font-mono text-[11px] font-bold tracking-[0.07em] uppercase">
        Newest
      </div>
      <div className="flex flex-col gap-3.5">
        {newest.map((pkg) => (
          <Link
            key={pkg.id}
            to="/packages/$owner/$repo"
            params={{ owner: pkg.owner, repo: pkg.name }}
            className="group flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <div className="text-tx2 group-hover:text-acc2 truncate font-mono text-[13.5px] font-semibold">
                {pkg.name}
              </div>
              <div className="text-fai truncate font-sans text-[11.5px]">
                {pkg.description || 'No description'}
              </div>
            </div>
            <span className="text-dim shrink-0 font-mono text-[10.5px] font-medium">
              {formatRelativeDate(pkg.createdAt).replace(' ago', '')}
            </span>
          </Link>
        ))}
      </div>
    </div>
  </div>
)
