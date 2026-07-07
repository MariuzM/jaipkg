type Props = {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

export const ViewBadge = ({ active, onClick, children }: Props) => (
  <button
    onClick={onClick}
    className={`rounded-pill inline-flex items-center gap-1.5 border px-3 py-1.25 font-mono text-[12px] font-semibold tracking-[0.02em] transition-colors ${
      active ? 'border-accbd bg-accsoft text-acc2' : 'border-chipbd bg-chip text-fai hover:text-tx2'
    }`}
  >
    {children}
  </button>
)
