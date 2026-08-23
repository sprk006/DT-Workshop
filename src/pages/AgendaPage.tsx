import { AppHeader } from '../components/AppHeader'
import { MEETINGS } from '../data/mock'
import type { Priority } from '../types'

interface AgendaPageProps {
  onOpenMeeting: (id: string) => void
}

const PRIORITY_CHIP: Record<Priority, string> = {
  high: 'chip-pink',
  medium: 'chip-blue',
  routine: 'chip-green',
}
const PRIORITY_LABEL: Record<Priority, string> = {
  high: 'High',
  medium: 'Medium',
  routine: 'Routine',
}

export function AgendaPage({ onOpenMeeting }: AgendaPageProps) {
  return (
    <div className="screen">
      <AppHeader title="Meetings" subtitle="Sorted by priority" />
      <div className="screen-body">
        <div className="section-label">This week</div>
        {MEETINGS.map((m) => (
          <button key={m.id} className="card card-btn meeting-list-card" onClick={() => onOpenMeeting(m.id)}>
            <div className="card-row">
              <span className={`chip ${PRIORITY_CHIP[m.priority]}`}>{PRIORITY_LABEL[m.priority]}</span>
              <span className="muted">{m.date} · {m.time}</span>
            </div>
            <div className="card-title">{m.title}</div>
            <div className="muted">{m.location}</div>
            <div className="meeting-list-foot">
              <div className="avatar-stack">
                {m.participants.slice(0, 3).map((p, i) => (
                  <span key={i} className={`avatar-mini ${p.confirmed ? 'confirmed' : ''}`}>
                    {p.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                  </span>
                ))}
              </div>
              <span className="muted">
                {m.participants.filter((p) => p.confirmed).length}/{m.participants.length} confirmed
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
