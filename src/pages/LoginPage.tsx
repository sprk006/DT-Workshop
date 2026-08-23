import { useState } from 'react'
import { AppHeader } from '../components/AppHeader'
import { Button } from '../components/Button'

interface LoginPageProps {
  onSubmit: (phone: string) => Promise<boolean>
  busy: boolean
  error: string
  devMode?: boolean
}

export function LoginPage({ onSubmit, busy, error, devMode }: LoginPageProps) {
  const [phone, setPhone] = useState('')

  const digitsOnly = phone.replace(/\D/g, '')
  const canSubmit = digitsOnly.length === 10

  return (
    <div className="screen">
      <AppHeader title="AAM Connect" subtitle="Health worker sign-in" />
      <div className="screen-body login-body">
        <div className="login-intro">
          <h1>Sign in as CHO</h1>
          <p>Enter your registered mobile number. We'll send a one-time code to verify it's you.</p>
        </div>

        {devMode && (
          <p className="dev-banner">
            Preview build — enter any 10-digit number, then use code <strong>123456</strong> on the next screen.
          </p>
        )}

        <label className="field">
          <span className="field-label">Mobile number</span>
          <div className="phone-input">
            <span className="phone-prefix">+91</span>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="98XXX XX214"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoFocus
            />
          </div>
        </label>

        {error && <p className="field-error">{error}</p>}

        <Button
          loading={busy}
          disabled={!canSubmit}
          onClick={() => onSubmit(`+91${digitsOnly}`)}
        >
          Send OTP
        </Button>

        <p className="login-note">
          Access is currently limited to <strong>Community Health Officers (CHO)</strong>.
          ANM and ASHA sign-in is coming soon.
        </p>
      </div>
    </div>
  )
}
