import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'

import {
  IconArchive,
  IconCheckCircle,
  IconExternalLink,
  IconGithub,
  IconStar,
} from '@/components/Icons'
import { formatNumber, formatRelativeDate } from '@/lib/format'
import { isMaintained, kindStyle } from '@/lib/pkg'
import type { PackageDetail } from '@/lib/types'
import { getPackage } from '@/server/packages'

export const Route = createFileRoute('/packages/$owner/$repo')({
  loader: ({ params }) => getPackage({ data: params }),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — jaipkg` : 'jaipkg' },
      { name: 'description', content: loaderData?.description ?? 'A Jai package on jaipkg.' },
    ],
  }),
  errorComponent: () => (
    <div className="mx-auto max-w-[1080px] px-6.5 py-24 text-center">
      <h1 className="text-tx font-sans text-xl font-bold">Package not found</h1>
      <p className="text-mut mt-2 font-sans text-sm">
        This repository may not exist or is not a Jai project.
      </p>
      <Link
        to="/packages"
        search={{ sort: 'stars' }}
        className="text-acc2 mt-6 inline-flex font-sans text-sm hover:opacity-80"
      >
        Back to packages
      </Link>
    </div>
  ),
  component: PackagePage,
})

type Tab = 'readme' | 'versions' | 'deps'

function PackagePage() {
  const pkg = Route.useLoaderData()
  const [tab, setTab] = useState<Tab>('readme')

  const kind = pkg.kind
  const ks = kindStyle[kind]
  const version = pkg.version

  return (
    <div className="mx-auto max-w-[1080px] px-6.5 pt-6 pb-10">
      {/* breadcrumb */}
      <div className="text-fai mb-4.5 font-mono text-[12px] font-medium">
        <Link to="/packages" search={{ sort: 'stars' }} className="hover:text-acc2">
          packages
        </Link>{' '}
        / <span className="text-tx2">{kind}</span> / <span className="text-tx2">{pkg.name}</span>
      </div>

      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <div className="flex flex-wrap items-center gap-2.75">
            <h1 className="text-tx font-mono text-[34px] font-extrabold tracking-[-0.02em]">
              {pkg.name}
            </h1>
            {version && (
              <span className="border-chipbd bg-chip text-mut rounded-[6px] border px-2 py-0.75 font-mono text-[12px] font-medium">
                {version}
              </span>
            )}
            <Link
              to="/packages"
              search={{ kind, sort: 'stars' }}
              className="rounded-[6px] px-2 py-0.75 font-mono text-[10px] font-semibold tracking-[0.05em] uppercase transition-opacity hover:opacity-80"
              style={{ color: ks.color, background: ks.bg }}
            >
              {kind}
            </Link>
            {pkg.archived && (
              <span className="bg-chip text-mut inline-flex items-center gap-1.25 rounded-[6px] px-2 py-0.75 font-mono text-[10px] font-semibold tracking-[0.05em] uppercase">
                <IconArchive size={11} /> archived
              </span>
            )}
          </div>
          <p className="text-mut mt-3 max-w-[560px] font-sans text-[15.5px] leading-[1.5]">
            {pkg.description || 'No description provided.'}
          </p>
          {pkg.topics.length > 0 && (
            <div className="mt-3.5 flex flex-wrap gap-1.75">
              {pkg.topics.slice(0, 6).map((t) => (
                <Link
                  key={t}
                  to="/packages"
                  search={{ q: t, sort: 'stars' }}
                  className="border-chipbd bg-chip text-tx2 hover:border-acc rounded-[20px] border px-2.5 py-1 font-mono text-[11.5px] font-medium"
                >
                  {t}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2.25">
          <div className="flex gap-2">
            <span className="border-chipbd bg-chip text-tx2 flex items-center gap-1.75 rounded-[9px] border px-3.25 py-2 font-mono text-[13px] font-semibold">
              <IconStar size={13} className="text-tx2" />
              {formatNumber(pkg.stars)}
            </span>
            <a
              href={pkg.url}
              target="_blank"
              rel="noreferrer"
              className="bg-acc text-btx inline-flex items-center gap-1.5 rounded-[9px] px-3.75 py-2 font-sans text-[13px] font-semibold transition-opacity hover:opacity-90"
            >
              Open repo <IconExternalLink size={13} />
            </a>
          </div>
          <span className="text-dim font-mono text-[11px] font-medium">
            {pkg.license ?? 'No license'} · updated {formatRelativeDate(pkg.pushedAt)}
          </span>
        </div>
      </div>

      {/* body */}
      <div className="mt-6.5 grid grid-cols-1 items-start gap-6.5 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <div className="border-bd mb-5 flex gap-5 border-b">
            <TabButton active={tab === 'readme'} onClick={() => setTab('readme')}>
              Readme
            </TabButton>
            <TabButton active={tab === 'versions'} onClick={() => setTab('versions')}>
              Versions{pkg.releases.length > 0 ? ` (${pkg.releases.length})` : ''}
            </TabButton>
            <TabButton active={tab === 'deps'} onClick={() => setTab('deps')}>
              Dependencies
            </TabButton>
          </div>

          {tab === 'readme' && <Readme pkg={pkg} />}
          {tab === 'versions' && <Versions pkg={pkg} />}
          {tab === 'deps' && (
            <p className="text-mut font-sans text-[14px]">
              Jai has no central dependency manifest, so dependency data isn&apos;t available for
              this package.
            </p>
          )}
        </div>

        <Sidebar pkg={pkg} kind={kind} />
      </div>
    </div>
  )
}

type TabButtonProps = {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

const TabButton = ({ active, onClick, children }: TabButtonProps) => (
  <button
    onClick={onClick}
    className="-mb-px border-b-2 pb-2.75 font-sans transition-colors"
    style={{
      fontSize: 13,
      fontWeight: active ? 600 : 500,
      color: active ? 'var(--tx)' : 'var(--fai)',
      borderColor: active ? 'var(--acc)' : 'transparent',
    }}
  >
    {children}
  </button>
)

const Readme = ({ pkg }: { pkg: PackageDetail }) =>
  pkg.readmeHtml ? (
    <div className="readme" dangerouslySetInnerHTML={{ __html: pkg.readmeHtml }} />
  ) : (
    <p className="text-mut font-sans text-[14px]">This package has no README.</p>
  )

const Versions = ({ pkg }: { pkg: PackageDetail }) =>
  pkg.releases.length === 0 ? (
    <p className="text-mut font-sans text-[14px]">No tagged releases.</p>
  ) : (
    <div className="flex flex-col gap-2">
      {pkg.releases.map((r) => (
        <a
          key={r.tag}
          href={r.url}
          target="_blank"
          rel="noreferrer"
          className="border-bd bg-card hover:border-acc flex items-center justify-between rounded-[10px] border px-4 py-3 transition-colors"
        >
          <span className="flex items-center gap-2.25">
            <span className="text-tx font-mono text-[13.5px] font-semibold">{r.tag}</span>
            {r.prerelease && (
              <span className="bg-accsoft text-acc2 rounded-[5px] px-1.5 py-0.5 font-mono text-[10px]">
                pre
              </span>
            )}
          </span>
          {r.publishedAt && (
            <span className="text-dim font-mono text-[11px]">
              {formatRelativeDate(r.publishedAt)}
            </span>
          )}
        </a>
      ))}
    </div>
  )

const MetaRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center justify-between font-sans text-[12.5px]">
    <span className="text-fai font-medium">{label}</span>
    <span className="text-tx2">{children}</span>
  </div>
)

const Sidebar = ({ pkg, kind }: { pkg: PackageDetail; kind: string }) => {
  const maintained = isMaintained(pkg.pushedAt)

  return (
    <aside className="border-bd bg-card top-20 flex flex-col overflow-hidden rounded-[12px] border lg:sticky">
      <div className="flex flex-col gap-2.75 px-4 py-3.5">
        <MetaRow label="Version">
          <span className="font-mono text-[12px]">{pkg.version ?? '—'}</span>
        </MetaRow>
        <MetaRow label="License">{pkg.license ?? 'None'}</MetaRow>
        <MetaRow label="Author">
          <a
            href={`https://github.com/${pkg.owner}`}
            target="_blank"
            rel="noreferrer"
            className="text-acc2 hover:opacity-80"
          >
            {pkg.owner}
          </a>
        </MetaRow>
        <MetaRow label="Type">{kind}</MetaRow>
        <MetaRow label="Forks">
          <span className="font-mono text-[12px]">{formatNumber(pkg.forks)}</span>
        </MetaRow>
        <MetaRow label="Created">{formatRelativeDate(pkg.createdAt)}</MetaRow>
        <MetaRow label="Repository">
          <a
            href={pkg.url}
            target="_blank"
            rel="noreferrer"
            className="text-acc2 inline-flex items-center gap-1.25 hover:opacity-80"
          >
            <IconGithub size={12} /> github
          </a>
        </MetaRow>
      </div>

      <div className="border-bd2 border-t px-4 py-3.5">
        <div className="text-fai mb-2.5 font-mono text-[10px] font-bold tracking-[0.07em] uppercase">
          Health
        </div>
        <div className="flex flex-wrap gap-1.5">
          {maintained && <HealthBadge>maintained</HealthBadge>}
          {pkg.releases.length > 0 && <HealthBadge>has releases</HealthBadge>}
          {pkg.homepage && <HealthBadge>has homepage</HealthBadge>}
          {!maintained && (
            <span className="bg-chip text-mut rounded-[6px] px-2 py-0.75 font-mono text-[11px] font-medium">
              low activity
            </span>
          )}
        </div>
      </div>
    </aside>
  )
}

const HealthBadge = ({ children }: { children: React.ReactNode }) => (
  <span
    className="text-ok inline-flex items-center gap-1.25 rounded-[6px] px-2 py-0.75 font-mono text-[11px] font-medium"
    style={{ background: 'color-mix(in srgb,var(--ok) 14%,transparent)' }}
  >
    <IconCheckCircle size={11} />
    {children}
  </span>
)
