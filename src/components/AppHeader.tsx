interface AppHeaderProps {
  title: string
  subtitle?: string
  onBack?: () => void
}

export function AppHeader({ title, subtitle, onBack }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header-row">
        {onBack && (
          <button className="back-btn" onClick={onBack} aria-label="Go back">
            ‹
          </button>
        )}
        <span className="app-header-title">{title}</span>
      </div>
      {subtitle && <div className="app-header-subtitle">{subtitle}</div>}
    </header>
  )
}
