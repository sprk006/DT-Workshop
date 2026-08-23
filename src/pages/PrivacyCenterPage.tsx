import { AppHeader } from '../components/AppHeader'
import { PrivacyNote } from '../components/PrivacyNote'

interface PrivacyCenterPageProps {
  onBack: () => void
}

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Is the app recording me?',
    a: 'No. There is no audio or video recording, and nothing runs in the background. A photo is only taken if you choose to, at the moment you tap the camera — and you always see it before it is saved.',
  },
  {
    q: 'Why does it ask for a photo, time and place?',
    a: 'Only to confirm a meeting actually happened, so your team gets credit for the work. It replaces paper attendance sheets — nothing more.',
  },
  {
    q: 'Can I say no to the photo?',
    a: 'Always. You can mark attendance manually with a single tap. No photo is ever required, and choosing manual has no effect on your incentives.',
  },
  {
    q: 'Who can see my attendance and photos?',
    a: 'Only you and the AAM team members in that meeting. It is not sent to the block office to monitor you.',
  },
  {
    q: 'Is my location tracked through the day?',
    a: 'No. Location is read once, only when you mark attendance, to note where the meeting was held. The app never follows your movements.',
  },
  {
    q: 'How long is my data kept?',
    a: 'Attendance photos are removed once the meeting record is confirmed. Meeting notes stay so your team has a shared history to refer back to.',
  },
]

export function PrivacyCenterPage({ onBack }: PrivacyCenterPageProps) {
  return (
    <div className="screen">
      <AppHeader title="Your privacy" subtitle="Plain answers, no jargon" onBack={onBack} />
      <div className="screen-body">
        <PrivacyNote title="This app is a tool for you, not a watch over you.">
          It exists to make your meetings lighter and your work visible — never to monitor you.
          Here is exactly how your information is handled.
        </PrivacyNote>

        <div className="faq-list">
          {FAQS.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">
                {f.q}
                <span className="chev">›</span>
              </summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="card pledge-card">
          <div className="card-title">Our pledge to health workers</div>
          <ul className="pledge-list">
            <li>You are always told what is captured, before it happens.</li>
            <li>You can always say no and still do your work.</li>
            <li>Your data is for coordination, never for surveillance.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
