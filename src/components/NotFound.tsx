import { Link } from '@tanstack/react-router'

export const NotFound = () => (
  <div className="mx-auto max-w-[1080px] px-6.5 py-24 text-center">
    <div className="text-fai font-mono text-[64px] font-extrabold tracking-[-0.03em]">404</div>
    <h1 className="text-tx mt-2 font-sans text-xl font-bold">Page not found</h1>
    <p className="text-mut mt-2 font-sans text-sm">
      The page you&apos;re looking for doesn&apos;t exist or has moved.
    </p>
    <Link
      to="/packages"
      search={{ sort: 'stars' }}
      className="text-acc2 mt-6 inline-flex font-sans text-sm hover:opacity-80"
    >
      Browse packages
    </Link>
  </div>
)
