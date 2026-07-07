/// <reference types="vite/client" />

import type { BrandId } from '@/lib/brands'

interface ImportMetaEnv {
  readonly VITE_BRAND?: BrandId
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
