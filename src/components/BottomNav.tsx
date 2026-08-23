import type { ReactNode } from 'react'

export type Tab = 'home' | 'agenda' | 'tasks' | 'profile'

interface BottomNavProps {
  active: Tab
  onChange: (tab: Tab) => void
}

const ICONS: Record<Tab, ReactNode> = {
  home: <path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1z" stroke="currentColor" strokeWidth="1.8" />,
  agenda: <><rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M4 10h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" /></>,
  tasks: <><path d="M5 12l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 8h6M14 14h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>,
  profile: <><circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.8" /><path d="M5 20c0-3.9 3.1-6 7-6s7 2.1 7 6" stroke="currentColor" strokeWidth="1.8" /></>,
}

const LABELS: Record<Tab, string> = {
  home: 'Home',
  agenda: 'Agenda',
  tasks: 'Tasks',
  profile: 'Profile',
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  const tabs: Tab[] = ['home', 'agenda', 'tasks', 'profile']
  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`nav-item ${active === tab ? 'active' : ''}`}
          onClick={() => onChange(tab)}
          aria-current={active === tab ? 'page' : undefined}
        >
          <svg viewBox="0 0 24 24" fill="none">{ICONS[tab]}</svg>
          {LABELS[tab]}
        </button>
      ))}
    </nav>
  )
}
