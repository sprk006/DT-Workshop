import { AppHeader } from '../components/AppHeader'
import { LEADERBOARD } from '../data/mock'

interface IncentivesPageProps {
  onBack: () => void
}

export function IncentivesPage({ onBack }: IncentivesPageProps) {
  return (
    <div className="screen">
      <AppHeader title="Incentives &amp; targets" subtitle="Sector leaderboard · September" onBack={onBack} />
      <div className="screen-body">
        <div className="stat-row">
          <div className="stat-tile">
            <div className="stat-num">₹1,240</div>
            <div className="stat-lab">Earned this month</div>
          </div>
          <div className="stat-tile">
            <div className="stat-num">#3</div>
            <div className="stat-lab">of 14 sectors</div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">This month's target</div>
          <div className="progress-track" style={{ marginTop: 10 }}>
            <div className="progress-fill" style={{ width: '87%' }} />
          </div>
          <div className="card-row" style={{ marginTop: 6 }}>
            <span className="muted">87% complete</span>
            <span className="muted">Auto-set from last month</span>
          </div>
        </div>

        <div className="section-label">Sector leaderboard</div>
        <div className="card leaderboard">
          {LEADERBOARD.map((row) => (
            <div key={row.rank} className={`leader-row ${row.isYou ? 'you' : ''}`}>
              <span className="rank-num">{row.rank}</span>
              <span className={`avatar-mini ${row.rank <= 3 ? 'confirmed' : ''}`}>{row.initials}</span>
              <span className="leader-name">{row.sector}</span>
              <span className={`chip ${row.score >= 90 ? 'chip-green' : row.score >= 80 ? 'chip-blue' : 'chip-pink'}`}>
                {row.score}%
              </span>
            </div>
          ))}
        </div>

        <div className="card badge-strip">
          <div className="card-title">Recognition</div>
          <div className="badges">
            <span className="badge-pill">🏅 On-time host</span>
            <span className="badge-pill">📋 Every meeting logged</span>
            <span className="badge-pill">🤝 Full team turnout</span>
          </div>
          <p className="muted" style={{ marginTop: 8 }}>
            Badges celebrate effort — they are shared with your team, never used against you.
          </p>
        </div>
      </div>
    </div>
  )
}
