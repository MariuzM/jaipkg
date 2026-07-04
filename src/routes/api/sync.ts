import { createFileRoute } from '@tanstack/react-router'

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

        running = true
        try {
          const { syncPackages } = await import('@/server/sync')
          const count = await syncPackages()
          lastRunAt = new Date().toISOString()
          return json({ ok: true, count, lastRunAt })
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
