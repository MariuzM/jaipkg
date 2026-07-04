import { createFileRoute } from '@tanstack/react-router'

import { Hero } from '@/components/Hero'
import { NewestRail } from '@/components/NewestRail'
import { PopularPackages } from '@/components/PopularPackages'
import { StatsStrip } from '@/components/StatsStrip'
import { getPackages, getStats } from '@/server/packages'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [stats, popular, updated, newest] = await Promise.all([
      getStats(),
      getPackages({ data: { sort: 'stars', perPage: 12 } }),
      getPackages({ data: { sort: 'updated', perPage: 12 } }),
      getPackages({ data: { sort: 'created', perPage: 20 } }),
    ])
    return { stats, popular: popular.items, updated: updated.items, newest: newest.items }
  },
  component: Home,
})

function Home() {
  const { stats, popular, updated, newest } = Route.useLoaderData()

  return (
    <div>
      <Hero />

      <StatsStrip stats={stats} />

      <div className="mx-auto grid max-w-[1240px] grid-cols-1 lg:grid-cols-[1fr_320px]">
        <PopularPackages popular={popular} updated={updated} />
        <NewestRail newest={newest} />
      </div>
    </div>
  )
}
