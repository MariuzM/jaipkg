export type Package = {
  id: string
  githubId: number
  name: string
  owner: string
  fullName: string
  description: string | null
  version: string | null
  url: string
  homepage: string | null
  stars: number
  forks: number
  openIssues: number
  watchers: number
  license: string | null
  topics: Array<string>
  language: string | null
  pushedAt: string
  createdAt: string
  updatedAt: string
  ownerAvatar: string
  archived: boolean
  defaultBranch: string
}

export type PackageDetail = Package & {
  readmeHtml: string | null
  releases: Array<Release>
  contributors: number | null
}

export type Release = {
  name: string
  tag: string
  url: string
  publishedAt: string | null
  prerelease: boolean
}

export type SortKey = 'stars' | 'updated' | 'created' | 'name'

export type PackageQuery = {
  q?: string
  sort?: SortKey
  page?: number
  perPage?: number
}

export type PackageListResult = {
  items: Array<Package>
  total: number
  page: number
  perPage: number
}

export type Stats = {
  totalPackages: number
  totalStars: number
  topContributors: number
}
