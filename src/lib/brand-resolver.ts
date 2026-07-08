import { createIsomorphicFn } from '@tanstack/react-start'
import { getRequestHost } from '@tanstack/react-start/server'

import type { BrandId, HostResolution } from './brands'
import { DEFAULT_BRAND_ID, envBrandId, resolveHost } from './brands'

export const getHostResolution = createIsomorphicFn()
  .server((): HostResolution => {
    const env = envBrandId()
    if (env) return { kind: 'brand', brandId: env }
    try {
      return resolveHost(getRequestHost())
    } catch {
      return { kind: 'landing' }
    }
  })
  .client((): HostResolution => {
    const env = envBrandId()
    if (env) return { kind: 'brand', brandId: env }
    return resolveHost(window.location.host)
  })

export const getBrandId = (): BrandId => {
  const r = getHostResolution()
  return r.kind === 'landing' ? DEFAULT_BRAND_ID : r.brandId
}
