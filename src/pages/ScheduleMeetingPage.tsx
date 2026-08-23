import { useState } from 'react'
import { AppHeader } from '../components/AppHeader'
import { Button } from '../components/Button'
import { PrivacyNote } from '../components/PrivacyNote'

interface ScheduleMeetingPageProps {
  onBack: () => void
  onScheduled: () => void
}

const SLOTS = ['Today · 3:00 PM', 'Tomorrow · 11:00 AM', 'Fri · 2:00 PM']
const ROLES = ['CHO', 'ANM', 'ASHA'] as const

export function ScheduleMeetingPage({ onBack, onScheduled }: ScheduleMeetingPageProps) {
  const [title, setTitle] = useState('AAM Monthly Sync')
  const [slot, setSlot] = useState(SLOTS[0])
  const [notify, setNotify] = useState<Record<string, boolean>>({ CHO: true, ANM: true, ASHA: true })

  return (
    <div className="screen">
      <AppHeader title="Schedule meeting" subtitle="Smart-suggested from your team's patterns" onBack={onBack} />
      <div className="screen-body">
        <label className="field">
          <span className="field-label">Meeting title</span>
          <input className="text-input" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <div className="field">
          <span className="field-label">Suggested time</span>
          <div className="slot-list">
            {SLOTS.map((s) => (
              <button key={s} className={`slot ${slot === s ? 'active' : ''}`} onClick={() => setSlot(s)}>
                {s}
              </button>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 6 }}>
            Chosen to avoid your Block &amp; Sector meetings, so AAM keeps its slot.
          </p>
        </div>

        <div className="field">
          <span className="field-label">Notify by call &amp; WhatsApp</span>
          <div className="chip-toggle-row">
            {ROLES.map((r) => (
              <button
                key={r}
                className={`chip-toggle ${notify[r] ? 'on' : ''}`}
                onClick={() => setNotify((n) => ({ ...n, [r]: !n[r] }))}
              >
                {notify[r] ? '✓ ' : ''}{r}
              </button>
            ))}
          </div>
        </div>

        <PrivacyNote tone="inline">
          Reminders go out to the people you pick here — no one is added or messaged without you choosing them.
        </PrivacyNote>

        <Button onClick={onScheduled}>Send reminders &amp; schedule</Button>
      </div>
    </div>
  )
}
