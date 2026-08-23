import { useEffect, useRef, useState } from 'react'
import { AppHeader } from '../components/AppHeader'
import { Button } from '../components/Button'
import { PrivacyNote } from '../components/PrivacyNote'
import { MEETINGS } from '../data/mock'

interface RecordingPageProps {
  meetingId: string
  onBack: () => void
  onFinish: (meetingId: string) => void
}

const TRANSCRIPT: { speaker: string; role: string; text: string }[] = [
  { speaker: 'Ashok Kumar', role: 'CHO', text: "Let's start with last month's follow-ups — where are we on the referral cases?" },
  { speaker: 'Sunita Devi', role: 'ANM', text: 'Both are closed. The child in Kheda village completed treatment last week.' },
  { speaker: 'Ashok Kumar', role: 'CHO', text: 'Good. Radha, how did the immunisation drive go in your area?' },
  { speaker: 'Radha', role: 'ASHA', text: 'We covered 18 of 20 children. Two families were travelling, I have their numbers.' },
  { speaker: 'Ashok Kumar', role: 'CHO', text: "I'll note that as a follow-up task. Now, NCD screening — are we on track for the target?" },
  { speaker: 'Kavita', role: 'ASHA', text: "We've surveyed 12 of 30 households so far. Need two more days." },
  { speaker: 'Ashok Kumar', role: 'CHO', text: 'Also flagging — ORS stock has come up three times now, we need to raise it with the block.' },
]

export function RecordingPage({ meetingId, onBack, onFinish }: RecordingPageProps) {
  const meeting = MEETINGS.find((m) => m.id === meetingId)
  const [seconds, setSeconds] = useState(0)
  const [paused, setPaused] = useState(false)
  const [lineCount, setLineCount] = useState(1)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [paused])

  useEffect(() => {
    if (paused || lineCount >= TRANSCRIPT.length) return
    const t = setTimeout(() => setLineCount((n) => Math.min(n + 1, TRANSCRIPT.length)), 2200)
    return () => clearTimeout(t)
  }, [paused, lineCount])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [lineCount])

  if (!meeting) {
    return (
      <div className="screen">
        <AppHeader title="Recording" onBack={onBack} />
        <div className="screen-body"><p className="muted">Meeting not found.</p></div>
      </div>
    )
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return (
    <div className="screen">
      <AppHeader title={meeting.title} subtitle="Recording & transcribing" onBack={onBack} />

      <div className="rec-status-bar">
        <span className={`rec-dot ${paused ? 'paused' : ''}`} aria-hidden="true" />
        <span>{paused ? 'Paused' : 'Recording'}</span>
        <span className="rec-timer">{mm}:{ss}</span>
        <span className="waveform" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className={`wave-bar ${paused ? 'still' : ''}`} style={{ animationDelay: `${i * 0.09}s` }} />
          ))}
        </span>
      </div>

      <div className="screen-body rec-body">
        <PrivacyNote tone="inline">
          This transcript is auto-generated from voice only — no video, no background listening.
          It's visible to this meeting's team once saved, and you can discard it any time before then.
        </PrivacyNote>

        <div className="section-label">Live transcript</div>
        <div className="transcript-box" ref={bodyRef}>
          {TRANSCRIPT.slice(0, lineCount).map((line, i) => (
            <div key={i} className="transcript-line">
              <span className={`avatar-mini ${line.role === 'CHO' ? 'confirmed' : ''}`}>
                {line.speaker.split(' ').map((w) => w[0]).join('').slice(0, 2)}
              </span>
              <div>
                <div className="transcript-speaker">{line.speaker} <span className="muted">· {line.role}</span></div>
                <div className="transcript-text">{line.text}</div>
              </div>
            </div>
          ))}
          {lineCount < TRANSCRIPT.length && !paused && (
            <div className="transcript-typing"><span /><span /><span /></div>
          )}
        </div>

        <div className="rec-actions">
          <Button variant="outline" onClick={() => setPaused((p) => !p)}>
            {paused ? '▸ Resume' : '‖ Pause'}
          </Button>
          <Button onClick={() => onFinish(meeting.id)}>Stop &amp; save transcript</Button>
        </div>
        <button className="link-inline center-note" onClick={onBack}>Discard recording</button>
      </div>
    </div>
  )
}
