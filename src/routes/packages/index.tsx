import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconGrid,
  IconList,
} from '#/components/Icons'
import { PackageCard } from '#/components/PackageCard'
import { PackageRow } from '#/components/PackageRow'
import { SearchBar } from '#/components/SearchBar'
import type { SortKey } from '#/lib/types'
import { getPackages } from '#/server/packages'
import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'

type PackagesSearch = {
  q?: string
  sort?: SortKey
  page?: number
}

const SORTS: Array<{ value: SortKey; label: string }> = [
  { value: 'stars', label: 'Most stars' },
  { value: 'updated', label: 'Recently updated' },
  { value: 'created', label: 'Newest' },
  { value: 'name', label: 'Name A–Z' },
]

const CATEGORIES: Array<{ label: string; q?: string }> = [
  { label: 'All packages', q: undefined },
  { label: 'Libraries', q: 'library' },
  { label: 'Bindings', q: 'bindings' },
  { label: 'Tools', q: 'tool' },
  { label: 'Applications', q: 'app' },
]

const TOPICS = ['graphics', 'gamedev', 'net', 'cli', 'simd', 'wasm', 'parser', 'math']

const PER_PAGE = 24

export const Route = createFileRoute('/packages/')({
  validateSearch: (search: Record<string, unknown>): PackagesSearch => {
    const sort = search.sort as SortKey
    const valid: Array<SortKey> = ['stars', 'updated', 'created', 'name']
    return {
      q: typeof search.q === 'string' && search.q ? search.q : undefined,
      sort: valid.includes(sort) ? sort : undefined,
      page: Number(search.page) > 1 ? Number(search.page) : undefined,
    }
  },
  loaderDeps: ({ search }) => search,
  loader: async ({ deps }) =>
    getPackages({
      data: { q: deps.q, sort: deps.sort ?? 'stars', page: deps.page ?? 1, perPage: PER_PAGE },
    }),
  component: PackagesPage,
})

function PackagesPage() {
  const data = Route.useLoaderData()
  const search = Route.useSearch()
  const [view, setView] = useState<'list' | 'grid'>('list')

  const page = search.page ?? 1
  const totalPages = Math.max(1, Math.ceil(data.total / PER_PAGE))
  const sort = search.sort ?? 'stars'
  const sortLabel = SORTS.find((s) => s.value === sort)?.label ?? 'Most stars'

  return (
    <div className="mx-auto max-w-[1240px] px-6.5 py-6.5">
      <SearchBar initial={search.q ?? ''} />

      <div className="mt-6 grid grid-cols-1 items-start gap-6.5 lg:grid-cols-[248px_1fr]">
        {/* filters */}
        <aside className="top-20 hidden flex-col gap-6 lg:sticky lg:flex">
          <FilterGroup title="Category">
            {CATEGORIES.map((c) => {
              const active = (search.q ?? undefined) === c.q
              return (
                <Link
                  key={c.label}
                  to="/packages"
                  search={{ q: c.q, sort }}
                  className={`flex items-center gap-2.25 rounded-[8px] px-2.5 py-2 font-sans text-[13px] transition-colors ${
                    active
                      ? 'bg-accsoft text-tx font-semibold'
                      : 'text-tx2 hover:bg-chip font-medium'
                  }`}
                >
                  <span
                    className="flex size-3.75 items-center justify-center rounded-[4px] border"
                    style={
                      active
                        ? {
                            background: 'var(--acc)',
                            borderColor: 'var(--acc)',
                            color: 'var(--btx)',
                          }
                        : { borderColor: 'var(--chipbd)' }
                    }
                  >
                    {active && <IconCheck size={11} />}
                  </span>
                  {c.label}
                </Link>
              )
            })}
          </FilterGroup>

          <div className="bg-bd2 h-px" />

          <FilterGroup title="Sort by">
            {SORTS.map((o) => {
              const active = sort === o.value
              return (
                <Link
                  key={o.value}
                  to="/packages"
                  search={{ q: search.q, sort: o.value }}
                  className={`rounded-[8px] px-2.5 py-1.75 font-sans text-[13px] transition-colors ${
                    active
                      ? 'bg-accsoft text-acc2 font-semibold'
                      : 'text-tx2 hover:bg-chip font-medium'
                  }`}
                >
                  {o.label}
                </Link>
              )
            })}
          </FilterGroup>

          <div className="bg-bd2 h-px" />

          <FilterGroup title="Topics">
            <div className="flex flex-wrap gap-1.75">
              {TOPICS.map((t) => {
                const active = search.q === t
                return (
                  <Link
                    key={t}
                    to="/packages"
                    search={{ q: t, sort }}
                    className="rounded-[20px] border px-2.25 py-1 font-mono text-[11.5px] font-medium transition-colors"
                    style={
                      active
                        ? {
                            color: 'var(--acc2)',
                            background: 'var(--accsoft)',
                            borderColor: 'var(--accbd)',
                          }
                        : {
                            color: 'var(--tx2)',
                            background: 'var(--chip)',
                            borderColor: 'var(--chipbd)',
                          }
                    }
                  >
                    {t}
                  </Link>
                )
              })}
            </div>
          </FilterGroup>
        </aside>

        {/* results */}
        <div>
          <div className="mb-3.5 flex items-baseline justify-between gap-3">
            <div className="text-mut font-sans text-[13.5px]">
              <span className="text-tx font-bold">{data.total.toLocaleString()} packages</span>
              {search.q && (
                <>
                  {' '}
                  matching{' '}
                  <span className="text-acc2 font-mono text-[13px] font-semibold">{search.q}</span>
                </>
              )}{' '}
              · sorted by {sortLabel.toLowerCase()}
            </div>
            <div className="flex gap-1.5">
              <ViewButton
                active={view === 'list'}
                onClick={() => setView('list')}
                label="List view"
              >
                <IconList size={15} />
              </ViewButton>
              <ViewButton
                active={view === 'grid'}
                onClick={() => setView('grid')}
                label="Grid view"
              >
                <IconGrid size={15} />
              </ViewButton>
            </div>
          </div>

          {data.items.length === 0 ? (
            <div className="border-bd bg-card flex flex-col items-center gap-3 rounded-[12px] border py-16 text-center">
              <p className="text-mut font-sans">No packages match your search.</p>
              <Link
                to="/packages"
                search={{ sort: 'stars' }}
                className="text-acc2 font-sans text-[13px] hover:opacity-80"
              >
                Clear filters
              </Link>
            </div>
          ) : view === 'list' ? (
            <div className="flex flex-col gap-2.5">
              {data.items.map((pkg) => (
                <PackageRow key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {data.items.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <PageLink to={Math.max(1, page - 1)} disabled={page <= 1} q={search.q} sort={sort}>
                <IconChevronLeft size={16} />
              </PageLink>
              <span className="text-fai px-3 font-mono text-[12.5px]">
                {page} / {totalPages}
              </span>
              <PageLink
                to={Math.min(totalPages, page + 1)}
                disabled={page >= totalPages}
                q={search.q}
                sort={sort}
              >
                <IconChevronRight size={16} />
              </PageLink>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

type FilterGroupProps = {
  title: string
  children: React.ReactNode
}

const FilterGroup = ({ title, children }: FilterGroupProps) => (
  <div>
    <div className="text-fai mb-3 font-mono text-[11px] font-bold tracking-[0.07em] uppercase">
      {title}
    </div>
    <div className="flex flex-col gap-0.5">{children}</div>
  </div>
)

type ViewButtonProps = {
  active: boolean
  onClick: () => void
  label: string
  children: React.ReactNode
}

const ViewButton = ({ active, onClick, label, children }: ViewButtonProps) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`flex h-7 w-7.5 items-center justify-center rounded-[7px] border transition-colors ${
      active ? 'border-acc bg-accsoft text-acc2' : 'border-chipbd text-fai hover:text-tx'
    }`}
  >
    {children}
  </button>
)

type PageLinkProps = {
  to: number
  disabled: boolean
  q?: string
  sort: SortKey
  children: React.ReactNode
}

const PageLink = ({ to, disabled, q, sort, children }: PageLinkProps) => (
  <Link
    to="/packages"
    search={{ q, sort, page: to > 1 ? to : undefined }}
    aria-disabled={disabled}
    className="border-chipbd bg-chip text-mut hover:text-tx flex size-8 items-center justify-center rounded-[8px] border transition-colors aria-disabled:pointer-events-none aria-disabled:opacity-40"
  >
    {children}
  </Link>
)
