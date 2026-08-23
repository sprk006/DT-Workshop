export type Role = 'CHO' | 'ANM' | 'ASHA'

export interface Profile {
  id: string
  phone: string
  name: string
  role: Role
  facility: string
  district: string
}

export type Priority = 'high' | 'medium' | 'routine'

export interface Meeting {
  id: string
  title: string
  date: string
  time: string
  location: string
  distanceKm: number
  priority: Priority
  status: 'upcoming' | 'today' | 'done'
  participants: { role: Role; name: string; confirmed: boolean }[]
  agenda: AgendaItem[]
}

export interface AgendaItem {
  id: string
  label: string
  done: boolean
  source?: 'analytics'
}

export type TaskStatus = 'todo' | 'doing' | 'done'

export interface Task {
  id: string
  title: string
  assignee: string
  assigneeInitials: string
  status: TaskStatus
  progress?: number
  priority: Priority
}

export interface LeaderRow {
  rank: number
  sector: string
  initials: string
  score: number
  isYou?: boolean
}
