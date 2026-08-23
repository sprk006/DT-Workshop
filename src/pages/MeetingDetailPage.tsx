import { useState } from 'react'
import { AppHeader } from '../components/AppHeader'
import { Button } from '../components/Button'
import { MEETINGS } from '../data/mock'
import type { AgendaItem } from '../types'

interface MeetingDetailPageProps {
  meetingId: string
  onBack: () => void
  onStart: (meetingId: string) => void
}

export function MeetingDetailPage({ meetingId, onBack, onStart }: MeetingDetailPageProps) {
  const meeting = MEETINGS.find((m) => m.id === meetingId)
  const [agenda, setAgenda] = useState<AgendaItem[]>(meeting?.agenda ?? [])

  if (!meeting) {
    return (
      <div className="screen">
        <AppHeader title="Meeting" onBack={onBack} />
        <div className="screen-body"><p className="muted">Meeting not found.</p></div>
      </div>
    )
  }

  const toggle = (id: string) =>
    setAgenda((items) => items.map((a) => (a.id === id ? { ...a, done: !a.done } : a)))

  return (
    <div className="screen">
      <AppHeader
        title={meeting.title}
        subtitle={`${meeting.date} · ${meeting.time} · ${meeting.location}`}
        onBack={onBack}
      />
      <div className="screen-body">
        <div className="card">
          <div className="section-label" style={{ marginTop: 0 }}>Participants</div>
          <div className="participant-list">
            {meeting.participants.map((p, i) => (
              <div key={i} className="participant-row">
                <span className={`avatar-mini ${p.confirmed ? 'confirmed' : ''}`}>
                  {p.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </span>
                <div className="participant-meta">
                  <span className="participant-name">{p.name}</span>
                  <span className="muted">{p.role}</span>
                </div>
                <span className={`chip ${p.confirmed ? 'chip-green' : 'chip-pink'}`}>
                  {p.confirmed ? 'Confirmed' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="section-label">Suggested agenda</div>
        <div className="card agenda-card">
          {agenda.map((item) => (
            <button key={item.id} className="agenda-item" onClick={() => toggle(item.id)}>
              <span className={`checkbox ${item.done ? 'checked' : ''}`} aria-hidden="true" />
              <span className={`agenda-label ${item.done ? 'done' : ''}`}>
                {item.label}
                {item.source === 'analytics' && <span className="chip chip-purple agenda-src">from analytics</span>}
              </span>
            </button>
          ))}
        </div>

        <Button onClick={() => onStart(meeting.id)}>Start meeting &amp; mark attendance</Button>
      </div>
    </div>
  )
}
