import type { Release } from '#/lib/types'
import { boolean, index, integer, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { ulid } from 'ulid'

export const packages = pgTable(
  'packages',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => ulid()),
    githubId: integer('github_id').notNull().unique(),
    name: text('name').notNull(),
    owner: text('owner').notNull(),
    fullName: text('full_name').notNull(),
    description: text('description'),
    version: text('version'),
    url: text('url').notNull(),
    homepage: text('homepage'),
    stars: integer('stars').notNull().default(0),
    forks: integer('forks').notNull().default(0),
    openIssues: integer('open_issues').notNull().default(0),
    watchers: integer('watchers').notNull().default(0),
    license: text('license'),
    topics: jsonb('topics').$type<Array<string>>().notNull().default([]),
    language: text('language'),
    kind: text('kind').notNull().default('library'),
    pushedAt: timestamp('pushed_at', { withTimezone: true }).notNull(),
    repoCreatedAt: timestamp('repo_created_at', { withTimezone: true }).notNull(),
    repoUpdatedAt: timestamp('repo_updated_at', { withTimezone: true }).notNull(),
    ownerAvatar: text('owner_avatar').notNull(),
    archived: boolean('archived').notNull().default(false),
    defaultBranch: text('default_branch').notNull().default('main'),
    readmeHtml: text('readme_html'),
    releases: jsonb('releases').$type<Array<Release>>().notNull().default([]),
    syncedAt: timestamp('synced_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('packages_stars_idx').on(t.stars),
    index('packages_pushed_idx').on(t.pushedAt),
    index('packages_owner_idx').on(t.owner),
    index('packages_kind_idx').on(t.kind),
  ],
)

export type PackageRow = typeof packages.$inferSelect
export type NewPackageRow = typeof packages.$inferInsert
