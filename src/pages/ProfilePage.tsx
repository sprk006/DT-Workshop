import type { Profile } from '../types'
import { AppHeader } from '../components/AppHeader'
import { Button } from '../components/Button'

interface ProfilePageProps {
  profile: Profile
  onOpenPrivacy: () => void
  onSignOut: () => void
}

export function ProfilePage({ profile, onOpenPrivacy, onSignOut }: ProfilePageProps) {
  const initials = profile.name.split(' ').map((w) => w[0]).join('').slice(0, 2)

  return (
    <div className="screen">
      <AppHeader title="My profile" />
      <div className="screen-body">
        <div className="card profile-card">
          <span className="avatar-lg">{initials}</span>
          <div className="profile-id">
            <div className="card-title">{profile.name}</div>
            <span className="chip chip-blue">{profile.role}</span>
          </div>
        </div>

        <div className="card kv-card">
          <div className="kv-row"><span className="muted">Facility</span><strong>{profile.facility}</strong></div>
          <div className="kv-divider" />
          <div className="kv-row"><span className="muted">District</span><strong>{profile.district}</strong></div>
          <div className="kv-divider" />
          <div className="kv-row"><span className="muted">Mobile</span><strong>{profile.phone || '—'}</strong></div>
        </div>

        <div className="section-label">Settings</div>
        <button className="list-row" onClick={onOpenPrivacy}>
          <span className="list-row-ic" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="list-row-text">
            <span className="list-row-title">Your privacy</span>
            <span className="muted">What we capture, and what we never do</span>
          </div>
          <span className="chev">›</span>
        </button>

        <div className="list-row list-row-static">
          <span className="list-row-ic" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </span>
          <div className="list-row-text">
            <span className="list-row-title">Language</span>
            <span className="muted">English · हिन्दी</span>
          </div>
          <span className="chip chip-green">EN</span>
        </div>

        <div className="signout-row">
          <Button variant="outline" onClick={onSignOut}>Sign out</Button>
        </div>
        <p className="muted center-note">AAM Connect · preview build</p>
      </div>
    </div>
  )
}
