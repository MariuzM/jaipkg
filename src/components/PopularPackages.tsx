import { useState } from 'react'
import { Link } from '@tanstack/react-router'

import { IconClock, IconStar } from '@/components/Icons'
import { PackageCard } from '@/components/PackageCard'
import { ViewBadge } from '@/components/ViewBadge'
import type { Package } from '@/lib/types'

type View = 'popular' | 'updated'

type Props = {
  popular: Array<Package>
  updated: Array<Package>
}

export const PopularPackages = ({ popular, updated }: Props) => {
  const [view, setView] = useState<View>('popular')

  const list = view === 'popular' ? popular : updated

  return (
    <div className="border-bd2 px-6.5 py-7">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ViewBadge active={view === 'popular'} onClick={() => setView('popular')}>
            <IconStar size={12} />
            Popular
          </ViewBadge>
          <ViewBadge active={view === 'updated'} onClick={() => setView('updated')}>
            <IconClock size={12} />
            Recently updated
          </ViewBadge>
        </div>
        <Link
          to="/packages"
          search={{ sort: view === 'popular' ? 'stars' : 'updated' }}
          className="text-acc2 font-sans text-[12.5px] font-semibold hover:opacity-80"
        >
          Browse all →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {list.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  )
}
