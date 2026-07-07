import { createIsomorphicFn } from '@tanstack/react-start'
import { getRequestHost } from '@tanstack/react-start/server'

import type { BrandId } from './brands'
import { brandIdFromHost, DEFAULT_BRAND_ID, envBrandId } from './brands'

export const getBrandId = createIsomorphicFn()
  .server((): BrandId => {
    const env = envBrandId()
    if (env) return env
    try {
      return brandIdFromHost(getRequestHost())
    } catch {
      return DEFAULT_BRAND_ID
    }
  })
  .client((): BrandId => envBrandId() ?? brandIdFromHost(window.location.host))
