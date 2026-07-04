import { createFileRoute, Link } from '@tanstack/react-router'

import { PackageCard } from '@/components/PackageCard'
import { SearchBar } from '@/components/SearchBar'
import { StatsStrip } from '@/components/StatsStrip'
import { formatRelativeDate } from '@/lib/format'
import { getPackages, getStats } from '@/server/packages'

const POPULAR_TOPICS = ['gamedev', 'bindings', 'graphics', 'simd', 'cli', 'http']

export const Route = createFileRoute('/')({
  loader: async () => {
    const [stats, popular, newest] = await Promise.all([
      getStats(),
      getPackages({ data: { sort: 'stars', perPage: 12 } }),
      getPackages({ data: { sort: 'created', perPage: 20 } }),
    ])
    return { stats, popular: popular.items, newest: newest.items }
  },
  component: Home,
})

function Home() {
  const { stats, popular, newest } = Route.useLoaderData()

  return (
    <div>
      <section className="relative overflow-hidden px-6.5 pt-17.5 pb-5 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(700px 320px at 50% -10%,var(--heroglow),transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-[820px]">
          <span className="border-accbd bg-accsoft text-acc2 inline-flex items-center gap-2 rounded-[20px] border px-2.75 py-1.25 font-mono text-[11px] font-semibold tracking-[0.06em] uppercase">
            Jai package discovery
          </span>
          <h1 className="text-tx mx-auto mt-5.5 mb-3.5 max-w-[720px] font-sans text-[54px] leading-[1.02] font-extrabold tracking-[-0.035em]">
            Find your next
            <br />
            Jai dependency
          </h1>
          <p className="text-mut mx-auto max-w-[500px] font-sans text-[16.5px] leading-[1.5]">
            Curated Jai libraries, tools, and bindings — with activity, versions, and health at a
            glance.
          </p>
          <div className="mx-auto mt-7.5 max-w-[600px]">
            <SearchBar autofocus />
          </div>
          <div className="mx-auto mt-4.5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-fai mr-0.5 font-sans text-[12px] font-medium">Popular</span>
            {POPULAR_TOPICS.map((t) => (
              <Link
                key={t}
                to="/packages"
                search={{ q: t, sort: 'stars' }}
                className="border-chipbd bg-chip text-tx2 hover:border-acc hover:text-acc2 rounded-[7px] border px-2.5 py-1.25 font-mono text-[12.5px] font-medium transition-colors"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* stats */}
      <StatsStrip stats={stats} />

      {/* main */}
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 lg:grid-cols-[1fr_320px]">
        <div className="border-bd2 px-6.5 py-7">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-tx font-sans text-[17px] font-bold tracking-[-0.01em]">
              Popular packages
            </h2>
            <Link
              to="/packages"
              search={{ sort: 'stars' }}
              className="text-acc2 font-sans text-[12.5px] font-semibold hover:opacity-80"
            >
              Browse all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {popular.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>

        {/* rail */}
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
      </div>
    </div>
  )
}
