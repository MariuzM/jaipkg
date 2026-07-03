import { syncPackages } from "#/server/sync"

const maxPagesPerQuery = process.env.SYNC_PAGES
  ? Number(process.env.SYNC_PAGES)
  : undefined

const run = async () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Add it to .env before syncing.")
    process.exit(1)
  }
  console.log("Syncing Jai packages from GitHub...")
  const n = await syncPackages({
    maxPagesPerQuery,
    onProgress: (msg) => console.log(`  ${msg}`),
  })
  console.log(`Done. Upserted ${n} packages.`)
  process.exit(0)
}

run().catch((e) => {
  console.error("Sync failed:", e instanceof Error ? e.message : e)
  process.exit(1)
})
