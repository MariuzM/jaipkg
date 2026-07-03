import type { Package } from './types'

export type PackageKind = 'library' | 'binding' | 'tool' | 'app'

export const deriveKind = (pkg: Package): PackageKind => {
  const hay = `${pkg.name} ${pkg.description ?? ''} ${pkg.topics.join(' ')}`.toLowerCase()
  if (/(binding|bindings|wrapper|ffi|-sys\b)/.test(hay)) return 'binding'
  if (/(\bcli\b|tool|tooling|compiler|linter|formatter|language-server|lsp)/.test(hay))
    return 'tool'
  if (/(\bapp\b|application|game|editor|engine|demo)/.test(hay)) return 'app'
  return 'library'
}

export const kindStyle: Record<PackageKind, { color: string; bg: string }> = {
  library: { color: '#818cf8', bg: 'rgba(129,140,248,.14)' },
  binding: { color: '#22d3a7', bg: 'rgba(34,211,167,.14)' },
  tool: { color: '#f0a952', bg: 'rgba(240,169,82,.14)' },
  app: { color: '#f472b6', bg: 'rgba(244,114,182,.14)' },
}

export const ownerInitial = (owner: string): string => owner.charAt(0).toLowerCase() || '?'

export const isMaintained = (iso: string): boolean =>
  Date.now() - new Date(iso).getTime() < 1000 * 60 * 60 * 24 * 180
