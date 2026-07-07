import { useRouteContext } from '@tanstack/react-router'

import type { Brand } from './brands'

export const useBrand = (): Brand => useRouteContext({ from: '__root__', select: (c) => c.brand })
