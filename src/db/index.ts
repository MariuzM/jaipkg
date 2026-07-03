import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

type Db = ReturnType<typeof drizzle<typeof schema>>

let cached: Db | null | undefined

export const getDb = (): Db | null => {
  if (cached !== undefined) return cached
  const url = process.env.DATABASE_URL
  if (!url) {
    cached = null
    return cached
  }
  const client = postgres(url, { max: 5, prepare: false })
  cached = drizzle(client, { schema })
  return cached
}
