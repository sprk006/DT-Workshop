import { useEffect, useState, useCallback } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Profile } from '../types'

export type AuthStage = 'loading' | 'signed_out' | 'otp_sent' | 'restricted' | 'signed_in'

const DEV_LOGIN = import.meta.env.VITE_DEV_LOGIN === 'true'
const DEV_OTP = '123456'

const DEV_PROFILE: Profile = {
  id: 'dev-cho-ashok-kumar',
  phone: '',
  name: 'Ashok Kumar',
  role: 'CHO',
  facility: 'Devali',
  district: 'Salumber',
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [stage, setStage] = useState<AuthStage>('loading')
  const [pendingPhone, setPendingPhone] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const loadProfile = useCallback(async (userId: string) => {
    const { data, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()

    if (profileError || !data) {
      setStage('restricted')
      return
    }
    if (data.role !== 'CHO') {
      setStage('restricted')
      return
    }
    setProfile(data as Profile)
    setStage('signed_in')
  }, [])

  useEffect(() => {
    if (DEV_LOGIN) {
      setStage('signed_out')
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (data.session) {
        loadProfile(data.session.user.id)
      } else {
        setStage('signed_out')
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      if (newSession) {
        loadProfile(newSession.user.id)
      } else {
        setStage('signed_out')
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [loadProfile])

  const sendOtp = useCallback(async (phone: string) => {
    setError('')
    setPendingPhone(phone)

    if (DEV_LOGIN) {
      setStage('otp_sent')
      return true
    }

    setBusy(true)
    const { error: otpError } = await supabase.auth.signInWithOtp({ phone })
    setBusy(false)
    if (otpError) {
      setError(otpError.message)
      return false
    }
    setStage('otp_sent')
    return true
  }, [])

  const verifyOtp = useCallback(async (token: string) => {
    setError('')

    if (DEV_LOGIN) {
      if (token !== DEV_OTP) {
        setError(`Invalid code. Use ${DEV_OTP} for this preview build.`)
        return false
      }
      setProfile({ ...DEV_PROFILE, phone: pendingPhone })
      setStage('signed_in')
      return true
    }

    setBusy(true)
    const { error: verifyError } = await supabase.auth.verifyOtp({
      phone: pendingPhone,
      token,
      type: 'sms',
    })
    setBusy(false)
    if (verifyError) {
      setError(verifyError.message)
      return false
    }
    return true
  }, [pendingPhone])

  const signOut = useCallback(async () => {
    if (!DEV_LOGIN) {
      await supabase.auth.signOut()
    }
    setProfile(null)
    setPendingPhone('')
    setStage('signed_out')
  }, [])

  return { session, profile, stage, pendingPhone, error, busy, sendOtp, verifyOtp, signOut, devMode: DEV_LOGIN }
}
