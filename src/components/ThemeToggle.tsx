import { IconMoon, IconSun } from './Icons'

export const ThemeToggle = () => {
  const toggle = () => {
    const el = document.documentElement
    const next = el.dataset.theme === 'light' ? 'dark' : 'light'
    el.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch (e) {
      void e
    }
  }

  return (
    <button
      onClick={toggle}
      title="Toggle theme"
      aria-label="Toggle theme"
      className="border-chipbd bg-chip text-mut hover:border-acc hover:text-tx flex size-7.5 items-center justify-center rounded-sm border transition"
    >
      <IconMoon className="ic-moon" />
      <IconSun className="ic-sun" />
    </button>
  )
}
