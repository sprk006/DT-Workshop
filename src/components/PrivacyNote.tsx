import type { ReactNode } from 'react'

interface PrivacyNoteProps {
  title?: string
  children: ReactNode
  tone?: 'calm' | 'inline'
}

/**
 * A warm, plain-language reassurance block. Used wherever the app captures
 * something a health worker might feel watched by (a photo, a location, a
 * time). Feedback sessions surfaced discomfort about "being recorded", so
 * this component always leads with what is NOT happening (no monitoring),
 * then what is, and who can see it.
 */
export function PrivacyNote({ title, children, tone = 'calm' }: PrivacyNoteProps) {
  return (
    <div className={`privacy-note privacy-note-${tone}`}>
      <span className="privacy-note-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div className="privacy-note-body">
        {title && <div className="privacy-note-title">{title}</div>}
        <div className="privacy-note-text">{children}</div>
      </div>
    </div>
  )
}
