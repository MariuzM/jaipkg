import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { NotFound } from '@/components/NotFound'
import { getBrandId } from '@/lib/brand-resolver'
import { getBrand } from '@/lib/brands'
import { useBrand } from '@/lib/useBrand'

import appCss from '../styles/styles.css?url'

const themeInit = `try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}`

export const Route = createRootRoute({
  beforeLoad: () => ({ brand: getBrand(getBrandId()) }),
  head: ({ match }) => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        title: `${match.context.brand.name} — ${match.context.brand.language} package registry`,
      },
      {
        name: 'description',
        content: `Find your next ${match.context.brand.language} dependency. Curated ${match.context.brand.language} libraries, bindings, and tools with activity, versions, and health at a glance.`,
      },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap',
      },
      { rel: 'stylesheet', href: appCss },
    ],
    scripts: [{ children: themeInit }],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const brand = useBrand()
  return (
    <html lang="en" data-theme="dark" data-brand={brand.id}>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
