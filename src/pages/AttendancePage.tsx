import { useState } from 'react'
import { AppHeader } from '../components/AppHeader'
import { Button } from '../components/Button'
import { PrivacyNote } from '../components/PrivacyNote'
import { MEETINGS } from '../data/mock'

interface AttendancePageProps {
  meetingId: string
  onBack: () => void
  onDone: () => void
  onOpenPrivacy: () => void
}

type CaptureMode = 'none' | 'photo' | 'manual'

export function AttendancePage({ meetingId, onBack, onDone, onOpenPrivacy }: AttendancePageProps) {
  const meeting = MEETINGS.find((m) => m.id === meetingId)
  const [mode, setMode] = useState<CaptureMode>('none')
  const [present, setPresent] = useState<Record<string, boolean>>(
    () => Object.fromEntries((meeting?.participants ?? []).map((p) => [p.name, p.confirmed])),
  )
  const [showWhoSees, setShowWhoSees] = useState(false)

  if (!meeting) {
    return (
      <div className="screen">
        <AppHeader title="Attendance" onBack={onBack} />
        <div className="screen-body"><p className="muted">Meeting not found.</p></div>
      </div>
    )
  }

  const toggle = (name: string) => setPresent((p) => ({ ...p, [name]: !p[name] }))
  const presentCount = Object.values(present).filter(Boolean).length

  return (
    <div className="screen">
      <AppHeader title="Mark attendance" subtitle={meeting.title} onBack={onBack} />
      <div className="screen-body">
        <PrivacyNote title="This confirms you showed up — it is not a recording.">
          Your photo simply marks you present. It stays with your AAM team, is never used to
          watch or judge your work, and you can skip it any time.{' '}
          <button className="link-inline" onClick={onOpenPrivacy}>How your data is kept safe ›</button>
        </PrivacyNote>

        {mode === 'none' && (
          <div className="card capture-choice">
            <div className="card-title">How would you like to mark attendance?</div>
            <p className="muted" style={{ marginTop: 4 }}>
              A quick group photo is the fastest, but it is completely optional.
            </p>
            <div className="capture-options">
              <button className="capture-option" onClick={() => setMode('photo')}>
                <span className="capture-option-ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="6" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
                    <circle cx="12" cy="13" r="3.4" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M8 6l1.4-2h5.2L16 6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="capture-option-title">Take a group photo</span>
                <span className="capture-option-sub">Recommended · optional</span>
              </button>
              <button className="capture-option" onClick={() => setMode('manual')}>
                <span className="capture-option-ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="capture-option-title">Mark present manually</span>
                <span className="capture-option-sub">No photo needed</span>
              </button>
            </div>
          </div>
        )}

        {mode === 'photo' && (
          <div className="card">
            <div className="camera-frame" aria-label="Camera preview placeholder">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="none">
                <circle cx="12" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.6" />
                <path d="M4 20c0-3.9 3.1-6 8-6s8 2.1 8 6" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <span>Group photo preview</span>
            </div>
            <div className="capture-meta">
              <div className="capture-meta-item">
                <span className="muted">Captured with</span>
                <strong>Time · {meeting.time}</strong>
              </div>
              <div className="capture-meta-item">
                <span className="muted">Place</span>
                <strong>{meeting.location.split(' ')[0]}</strong>
              </div>
            </div>
            <button className="link-inline" onClick={() => setMode('manual')} style={{ marginTop: 10 }}>
              Prefer not to? Switch to manual ›
            </button>
          </div>
        )}

        <div className="section-label">Present today</div>
        <div className="card">
          {meeting.participants.map((p) => (
            <button key={p.name} className="present-row" onClick={() => toggle(p.name)}>
              <span className={`avatar-mini ${present[p.name] ? 'confirmed' : ''}`}>
                {p.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
              </span>
              <div className="participant-meta">
                <span className="participant-name">{p.name}</span>
                <span className="muted">{p.role}</span>
              </div>
              <span className={`checkbox ${present[p.name] ? 'checked' : ''}`} aria-hidden="true" />
            </button>
          ))}
        </div>

        <button className="who-sees-toggle" onClick={() => setShowWhoSees((s) => !s)}>
          <span>Who can see this attendance?</span>
          <span className={`chev ${showWhoSees ? 'open' : ''}`}>›</span>
        </button>
        {showWhoSees && (
          <div className="who-sees-body">
            <p><strong>Your AAM team</strong> — the ANM and ASHAs in this meeting.</p>
            <p><strong>You</strong> — any time, from your profile.</p>
            <p className="muted">
              It is not shared with the block office to monitor you, and photos are removed
              after the meeting record is confirmed.
            </p>
          </div>
        )}

        <Button onClick={onDone}>
          Save attendance ({presentCount}/{meeting.participants.length})
        </Button>
        <p className="muted center-note">You can edit this later if someone arrives late.</p>
      </div>
    </div>
  )
}
