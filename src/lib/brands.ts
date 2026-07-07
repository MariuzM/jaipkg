export type BrandId = 'jai' | 'odin'

export type Brand = {
  id: BrandId
  name: string
  letter: string
  domain: string
  tagline: string
  heroLine: string
  language: string
  repo: string
  topics: Array<string>
  searchQualifier: string
  discoveryQueries: Array<string>
}

export const BRANDS: Record<BrandId, Brand> = {
  jai: {
    id: 'jai',
    name: 'jaipkg',
    letter: 'j',
    domain: 'jaipkg.dev',
    tagline: 'Jai package discovery',
    heroLine: 'Jai dependency',
    language: 'Jai',
    repo: 'MariuzM/jaipkg',
    topics: ['gamedev', 'bindings', 'graphics', 'simd', 'cli', 'http'],
    searchQualifier: 'language:Jai fork:false',
    discoveryQueries: [
      'language:Jai fork:false',
      'topic:jai fork:false',
      'topic:jai-lang fork:false',
      'topic:jai-programming-language fork:false',
      'topic:jai-module fork:false',
      'topic:jai-library fork:false',
      'topic:jai-beta-users fork:false',
    ],
  },
  odin: {
    id: 'odin',
    name: 'odinpkg',
    letter: 'o',
    domain: 'odinpkg.dev',
    tagline: 'Odin package discovery',
    heroLine: 'Odin dependency',
    language: 'Odin',
    repo: 'MariuzM/odinpkg',
    topics: ['gamedev', 'bindings', 'graphics', 'vendor', 'cli', 'http'],
    searchQualifier: 'language:Odin fork:false',
    discoveryQueries: [
      'language:Odin fork:false',
      'topic:odin fork:false',
      'topic:odin-lang fork:false',
      'topic:odinlang fork:false',
      'topic:odin-programming-language fork:false',
      'topic:odin-package fork:false',
    ],
  },
}

export const DEFAULT_BRAND_ID: BrandId = 'jai'

export const isBrandId = (v: string | null | undefined): v is BrandId =>
  v != null && Object.prototype.hasOwnProperty.call(BRANDS, v)

export const getBrand = (id: BrandId): Brand => BRANDS[id]

export const brandIdFromHost = (host: string | null | undefined): BrandId => {
  if (!host) return DEFAULT_BRAND_ID
  const h = host.toLowerCase().split(':')[0]
  const match = Object.values(BRANDS).find(
    (b) => h === b.domain || h.endsWith(`.${b.domain}`) || h.split('.').includes(b.id),
  )
  return match?.id ?? DEFAULT_BRAND_ID
}

export const envBrandId = (): BrandId | null => {
  const v = import.meta.env.VITE_BRAND
  return isBrandId(v) ? v : null
}
