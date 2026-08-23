import { useState } from 'react'
import { AppHeader } from '../components/AppHeader'
import { Button } from '../components/Button'

interface OtpPageProps {
  phone: string
  onVerify: (token: string) => Promise<boolean>
  onBack: () => void
  busy: boolean
  error: string
  devMode?: boolean
}

export function OtpPage({ phone, onVerify, onBack, busy, error, devMode }: OtpPageProps) {
  const [token, setToken] = useState('')

  return (
    <div className="screen">
      <AppHeader title="Verify OTP" subtitle={`Code sent to ${phone}`} onBack={onBack} />
      <div className="screen-body login-body">
        <div className="login-intro">
          <h1>Enter the 6-digit code</h1>
          <p>Didn't get it? Check your SMS inbox — codes may take a minute to arrive.</p>
        </div>

        {devMode && (
          <p className="dev-banner">Preview build — use code <strong>123456</strong>.</p>
        )}

        <label className="field">
          <span className="field-label">One-time password</span>
          <input
            className="otp-input"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="••••••"
            value={token}
            onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))}
            autoFocus
          />
        </label>

        {error && <p className="field-error">{error}</p>}

        <Button loading={busy} disabled={token.length !== 6} onClick={() => onVerify(token)}>
          Verify &amp; Continue
        </Button>
      </div>
    </div>
  )
}
