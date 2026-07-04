import { sql } from 'drizzle-orm'

import { getDb } from '@/db'
import { packages } from '@/db/schema'
import type { NewPackageRow } from '@/db/schema'
import type { Package } from '@/lib/types'

import { fetchLatestVersion, GITHUB_SEARCH_LIMIT, searchReposPage } from './github-source'
import type { GhError } from './github-source'

const toRow = (p: Package): NewPackageRow => ({
  id: p.id,
  githubId: p.githubId,
  name: p.name,
  owner: p.owner,
  fullName: p.fullName,
  description: p.description,
  version: p.version,
  url: p.url,
  homepage: p.homepage,
  stars: p.stars,
  forks: p.forks,
  openIssues: p.openIssues,
  watchers: p.watchers,
  license: p.license,
  topics: p.topics,
  language: p.language,
  kind: p.kind,
  pushedAt: new Date(p.pushedAt),
  repoCreatedAt: new Date(p.createdAt),
  repoUpdatedAt: new Date(p.updatedAt),
  ownerAvatar: p.ownerAvatar,
  archived: p.archived,
  defaultBranch: p.defaultBranch,
})

const updateSet = {
  name: sql`excluded.name`,
  owner: sql`excluded.owner`,
  fullName: sql`excluded.full_name`,
  description: sql`excluded.description`,
  version: sql`excluded.version`,
  url: sql`excluded.url`,
  homepage: sql`excluded.homepage`,
  stars: sql`excluded.stars`,
  forks: sql`excluded.forks`,
  openIssues: sql`excluded.open_issues`,
  watchers: sql`excluded.watchers`,
  license: sql`excluded.license`,
  topics: sql`excluded.topics`,
  language: sql`excluded.language`,
  kind: sql`excluded.kind`,
  pushedAt: sql`excluded.pushed_at`,
  repoUpdatedAt: sql`excluded.repo_updated_at`,
  ownerAvatar: sql`excluded.owner_avatar`,
  archived: sql`excluded.archived`,
  defaultBranch: sql`excluded.default_branch`,
  syncedAt: sql`now()`,
}

const DISCOVERY_QUERIES = [
  'language:Jai fork:false',
  'topic:jai fork:false',
  'topic:jai-lang fork:false',
  'topic:jai-programming-language fork:false',
  'topic:jai-module fork:false',
  'topic:jai-library fork:false',
  'topic:jai-beta-users fork:false',
]

const GITHUB_PAGE_LIMIT = Math.ceil(GITHUB_SEARCH_LIMIT / 100)

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export type SyncOptions = {
  perPage?: number
  maxPagesPerQuery?: number
  delayMs?: number
  fetchVersions?: boolean
  onProgress?: (msg: string) => void
}

const runPool = async <T>(
  items: Array<T>,
  concurrency: number,
  worker: (item: T) => Promise<void>,
) => {
  let index = 0
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (index < items.length) {
      const current = index
      index += 1
      await worker(items[current])
    }
  })
  await Promise.all(runners)
}

const isGhError = (e: unknown): e is GhError =>
  e instanceof Error && typeof (e as GhError).status === 'number'

const collectQuery = async (
  query: string,
  collected: Map<number, Package>,
  opts: Required<Omit<SyncOptions, 'onProgress'>> & { onProgress?: (msg: string) => void },
) => {
  const maxPages = Math.min(opts.maxPagesPerQuery, GITHUB_PAGE_LIMIT)

  for (let page = 1; page <= maxPages; page += 1) {
    let res
    try {
      res = await searchReposPage(query, {
        sort: 'stars',
        page,
        perPage: opts.perPage,
        ttlMs: 0,
      })
    } catch (e) {
      if (isGhError(e) && e.rateLimited) {
        const waitMs = e.resetAt
          ? Math.max(1000, Math.min(e.resetAt - Date.now() + 1000, 90_000))
          : 60_000
        opts.onProgress?.(
          `Rate limited — waiting ${Math.round(waitMs / 1000)}s (set GITHUB_TOKEN to speed this up)...`,
        )
        await sleep(waitMs)
        page -= 1
        continue
      }
      throw e
    }

    if (page === 1 && res.total > GITHUB_SEARCH_LIMIT - 1) {
      opts.onProgress?.(
        `"${query}" reports ${res.total}+ results; GitHub caps search at ${GITHUB_SEARCH_LIMIT}.`,
      )
    }

    let added = 0
    for (const p of res.items) {
      if (!collected.has(p.githubId)) added += 1
      collected.set(p.githubId, p)
    }
    opts.onProgress?.(`${query} — page ${page}: +${added} new (${collected.size} total)`)

    if (res.items.length < opts.perPage) break
    await sleep(opts.delayMs)
  }
}

export const syncPackages = async ({
  perPage = 100,
  maxPagesPerQuery = GITHUB_PAGE_LIMIT,
  delayMs = process.env.GITHUB_TOKEN ? 300 : 2500,
  fetchVersions = Boolean(process.env.GITHUB_TOKEN),
  onProgress,
}: SyncOptions = {}): Promise<number> => {
  const db = getDb()
  if (!db) throw new Error('DATABASE_URL is not set')

  const collected = new Map<number, Package>()
  for (const query of DISCOVERY_QUERIES) {
    await collectQuery(query, collected, {
      perPage,
      maxPagesPerQuery,
      delayMs,
      fetchVersions,
      onProgress,
    })
  }

  const list = [...collected.values()]

  if (fetchVersions && list.length > 0) {
    onProgress?.(`Fetching versions for ${list.length} packages...`)
    let done = 0
    await runPool(list, 6, async (p) => {
      p.version = await fetchLatestVersion(p.owner, p.name)
      done += 1
      if (done % 100 === 0 || done === list.length) {
        onProgress?.(`versions: ${done}/${list.length}`)
      }
    })
  }

  const rows = list.map(toRow)
  if (rows.length === 0) return 0

  const chunkSize = 200
  for (let i = 0; i < rows.length; i += chunkSize) {
    await db
      .insert(packages)
      .values(rows.slice(i, i + chunkSize))
      .onConflictDoUpdate({ target: packages.githubId, set: updateSet })
  }

  return rows.length
}
