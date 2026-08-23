import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

type Status = 'checking' | 'connected' | 'error'

function App() {
  const [status, setStatus] = useState<Status>('checking')
  const [message, setMessage] = useState('')

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(() => setStatus('connected'))
      .catch((err: Error) => {
        setStatus('error')
        setMessage(err.message)
      })
  }, [])

  return (
    <section id="center">
      <h1>DT Workshop</h1>
      <p>Supabase-connected app shell</p>
      <p>
        Status: <strong>{status}</strong>
      </p>
      {status === 'error' && <p>{message}</p>}
    </section>
  )
}

export default App
