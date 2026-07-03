# jaipkg

Package discovery for the [Jai](https://en.wikipedia.org/wiki/Jai_(programming_language)) programming language. Browse, search, and inspect Jai libraries, tools, and bindings — sourced live from GitHub with stars, activity, versions, and READMEs at a glance.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19 + TanStack Router)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Drizzle ORM](https://orm.drizzle.team) + Postgres
- [Bun](https://bun.sh) + [Vite](https://vitejs.dev)

## Development

```bash
bun install
bun run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Environment

Create a `.env` file:

```bash
GITHUB_TOKEN=your_github_token   # raises GitHub API rate limits
DATABASE_URL=postgres://...      # Postgres connection string
```

## Credits

Inspired by [scheibo/zigpkg](https://github.com/scheibo/zigpkg).
