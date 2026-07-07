import { createFileRoute } from '@tanstack/react-router'

import { BRANDS, isBrandId } from '@/lib/brands'

let running = false
let lastRunAt: string | null = null

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })

export const Route = createFileRoute('/api/sync')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.SYNC_SECRET
        if (!secret) return json({ error: 'SYNC_SECRET is not configured' }, 500)

        const auth = request.headers.get('authorization')
        if (auth !== `Bearer ${secret}`) return json({ error: 'unauthorized' }, 401)

        if (running) return json({ error: 'sync already running' }, 409)

        const brandParam = new URL(request.url).searchParams.get('brand')
        const brands = isBrandId(brandParam) ? [BRANDS[brandParam]] : Object.values(BRANDS)

        running = true
        try {
          const { syncPackages } = await import('@/server/sync')
          const counts: Record<string, number> = {}
          for (const brand of brands) {
            counts[brand.id] = await syncPackages(brand)
          }
          const count = Object.values(counts).reduce((a, b) => a + b, 0)
          lastRunAt = new Date().toISOString()
          return json({ ok: true, count, counts, lastRunAt })
        } catch (e) {
          return json({ error: e instanceof Error ? e.message : 'sync failed' }, 500)
        } finally {
          running = false
        }
      },
      GET: () => json({ running, lastRunAt }),
    },
  },
})
