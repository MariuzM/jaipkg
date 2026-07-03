import type { SVGProps } from 'react'

type IconProps = {
  size?: number
} & SVGProps<SVGSVGElement>

const stroke = (size: number, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
})

const fill = (size: number, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  ...props,
})

export const IconSearch = ({ size = 17, ...props }: IconProps) => (
  <svg {...stroke(size, props)}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

export const IconMoon = ({ size = 15, ...props }: IconProps) => (
  <svg {...stroke(size, props)}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
)

export const IconSun = ({ size = 16, ...props }: IconProps) => (
  <svg {...stroke(size, props)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
)

export const IconGithub = ({ size = 15, ...props }: IconProps) => (
  <svg {...fill(size, props)} aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

export const IconStar = ({ size = 12, ...props }: IconProps) => (
  <svg {...fill(size, props)}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
  </svg>
)

export const IconExternalLink = ({ size = 13, ...props }: IconProps) => (
  <svg {...stroke(size, props)} strokeWidth={2.2}>
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
  </svg>
)

export const IconCheck = ({ size = 11, ...props }: IconProps) => (
  <svg {...stroke(size, props)} strokeWidth={3}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const IconCheckCircle = ({ size = 11, ...props }: IconProps) => (
  <svg {...stroke(size, props)} strokeWidth={2.4}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </svg>
)

export const IconList = ({ size = 15, ...props }: IconProps) => (
  <svg {...stroke(size, props)}>
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
)

export const IconGrid = ({ size = 15, ...props }: IconProps) => (
  <svg {...stroke(size, props)}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
)

export const IconChevronLeft = ({ size = 16, ...props }: IconProps) => (
  <svg {...stroke(size, props)}>
    <path d="m15 18-6-6 6-6" />
  </svg>
)

export const IconChevronRight = ({ size = 16, ...props }: IconProps) => (
  <svg {...stroke(size, props)}>
    <path d="m9 18 6-6-6-6" />
  </svg>
)

export const IconArrowRight = ({ size = 15, ...props }: IconProps) => (
  <svg {...stroke(size, props)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const IconArchive = ({ size = 13, ...props }: IconProps) => (
  <svg {...stroke(size, props)}>
    <rect x="2" y="4" width="20" height="5" rx="1" />
    <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9M10 13h4" />
  </svg>
)
