import { useAuth } from './hooks/useAuth'
import { LoginPage } from './pages/LoginPage'
import { OtpPage } from './pages/OtpPage'
import { RestrictedPage } from './pages/RestrictedPage'
import { AppShell } from './AppShell'
import './App.css'

function App() {
  const { stage, pendingPhone, profile, error, busy, sendOtp, verifyOtp, signOut, devMode } = useAuth()

  if (stage === 'loading') {
    return <div className="screen splash">Loading…</div>
  }

  if (stage === 'signed_out') {
    return <LoginPage onSubmit={sendOtp} busy={busy} error={error} devMode={devMode} />
  }

  if (stage === 'otp_sent') {
    return (
      <OtpPage
        phone={pendingPhone}
        onVerify={verifyOtp}
        onBack={signOut}
        busy={busy}
        error={error}
        devMode={devMode}
      />
    )
  }

  if (stage === 'restricted') {
    return <RestrictedPage onSignOut={signOut} />
  }

  if (profile) {
    return <AppShell profile={profile} onSignOut={signOut} />
  }

  return <div className="screen splash">Loading…</div>
}

export default App
