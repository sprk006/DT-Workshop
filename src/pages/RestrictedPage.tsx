import { AppHeader } from '../components/AppHeader'
import { Button } from '../components/Button'

interface RestrictedPageProps {
  onSignOut: () => void
}

export function RestrictedPage({ onSignOut }: RestrictedPageProps) {
  return (
    <div className="screen">
      <AppHeader title="AAM Connect" />
      <div className="screen-body restricted-body">
        <div className="restricted-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 8v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
          </svg>
        </div>
        <h1>CHO access only, for now</h1>
        <p>
          This number isn't registered as a Community Health Officer. AAM Connect currently
          supports CHO sign-in only — ANM and ASHA access is being rolled out next.
        </p>
        <Button variant="outline" onClick={onSignOut}>
          Try a different number
        </Button>
      </div>
    </div>
  )
}
