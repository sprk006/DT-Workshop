import type { Profile } from '../types'
import { Button } from '../components/Button'
import { MEETINGS, TASKS } from '../data/mock'

interface DashboardPageProps {
  profile: Profile
  onOpenMeeting: (id: string) => void
  onSchedule: () => void
  onOpenIncentives: () => void
  onGoTasks: () => void
}

export function DashboardPage({
  profile,
  onOpenMeeting,
  onSchedule,
  onOpenIncentives,
  onGoTasks,
}: DashboardPageProps) {
  const today = MEETINGS.find((m) => m.status === 'today')
  const pendingTasks = TASKS.filter((t) => t.status !== 'done').length

  return (
    <div className="screen">
      <header className="app-header dashboard-header">
        <div className="app-header-row">
          <span className="app-header-title">Namaste, {profile.name.split(' ')[0]}</span>
        </div>
        <div className="app-header-subtitle">
          {profile.facility} · {profile.district} district
        </div>
      </header>

      <div className="screen-body dashboard-body">
        <div className="stat-row">
          <button className="stat-tile stat-tile-btn" onClick={onGoTasks}>
            <div className="stat-num">2</div>
            <div className="stat-lab">Meetings this month</div>
          </button>
          <button className="stat-tile stat-tile-btn" onClick={onGoTasks}>
            <div className="stat-num">{pendingTasks}</div>
            <div className="stat-lab">Pending tasks</div>
          </button>
          <div className="stat-tile">
            <div className="stat-num">86%</div>
            <div className="stat-lab">Attendance</div>
          </div>
        </div>

        {today && (
          <button className="card meeting-card card-btn" onClick={() => onOpenMeeting(today.id)}>
            <div className="card-row">
              <span className="chip chip-blue">Upcoming</span>
              <span className="muted">{today.distanceKm} km away</span>
            </div>
            <div className="card-title">{today.title}</div>
            <div className="muted">
              {today.date} · {today.time} · {today.location}
            </div>
            <div className="card-cta">Open meeting ›</div>
          </button>
        )}

        <div className="card">
          <div className="card-title">Team status</div>
          <div className="card-row" style={{ marginTop: 10, flexWrap: 'wrap', gap: 6, justifyContent: 'flex-start' }}>
            <span className="chip chip-green">ANM ✓ confirmed</span>
            <span className="chip chip-pink">2 ASHA pending</span>
          </div>
        </div>

        <button className="card incentive-teaser card-btn" onClick={onOpenIncentives}>
          <div className="card-row">
            <div>
              <div className="card-title">Sector rank #3</div>
              <div className="muted">₹1,240 earned this month</div>
            </div>
            <span className="card-cta">View ›</span>
          </div>
        </button>

        <Button onClick={onSchedule}>+ Schedule AAM Meeting</Button>
      </div>
    </div>
  )
}
