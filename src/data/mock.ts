import type { Meeting, Task, LeaderRow } from '../types'

export const MEETINGS: Meeting[] = [
  {
    id: 'm1',
    title: 'AAM Monthly Sync',
    date: 'Today',
    time: '3:00 PM',
    location: 'Devali Sub-centre hall',
    distanceKm: 1.2,
    priority: 'high',
    status: 'today',
    participants: [
      { role: 'CHO', name: 'Ashok Kumar', confirmed: true },
      { role: 'ANM', name: 'Sunita Devi', confirmed: true },
      { role: 'ASHA', name: 'Radha', confirmed: false },
      { role: 'ASHA', name: 'Kavita', confirmed: false },
    ],
    agenda: [
      { id: 'a1', label: "Last month's follow-ups", done: true },
      { id: 'a2', label: 'Immunisation drive review', done: true },
      { id: 'a3', label: 'NCD screening targets', done: false },
      { id: 'a4', label: 'Referral case updates', done: false },
      { id: 'a5', label: 'Recurring ORS stock-out (3 mentions)', done: false, source: 'analytics' },
    ],
  },
  {
    id: 'm2',
    title: 'Immunisation catch-up review',
    date: 'Fri, 15 Sep',
    time: '2:00 PM',
    location: 'Devali Sub-centre hall',
    distanceKm: 1.2,
    priority: 'high',
    status: 'upcoming',
    participants: [
      { role: 'CHO', name: 'Ashok Kumar', confirmed: true },
      { role: 'ANM', name: 'Sunita Devi', confirmed: false },
    ],
    agenda: [
      { id: 'b1', label: 'Zero-dose children list', done: false },
      { id: 'b2', label: 'Cold-chain readiness', done: false },
    ],
  },
  {
    id: 'm3',
    title: 'NCD screening planning',
    date: 'Mon, 18 Sep',
    time: '11:00 AM',
    location: 'Devali Sub-centre hall',
    distanceKm: 1.2,
    priority: 'medium',
    status: 'upcoming',
    participants: [
      { role: 'CHO', name: 'Ashok Kumar', confirmed: true },
      { role: 'ANM', name: 'Sunita Devi', confirmed: false },
      { role: 'ASHA', name: 'Radha', confirmed: false },
    ],
    agenda: [
      { id: 'c1', label: '30+ population survey plan', done: false },
      { id: 'c2', label: 'BP/sugar camp scheduling', done: false },
    ],
  },
]

export const TASKS: Task[] = [
  { id: 't1', title: 'Restock ORS kits', assignee: 'Sunita Devi', assigneeInitials: 'SD', status: 'todo', priority: 'high' },
  { id: 't2', title: 'Update village health register', assignee: 'Radha', assigneeInitials: 'RA', status: 'todo', priority: 'medium' },
  { id: 't3', title: 'NCD survey — 12 households', assignee: 'Kavita', assigneeInitials: 'KA', status: 'doing', progress: 60, priority: 'medium' },
  { id: 't4', title: 'Follow up on 2 referral cases', assignee: 'Ashok Kumar', assigneeInitials: 'AK', status: 'doing', progress: 30, priority: 'high' },
  { id: 't5', title: 'Cold-chain temperature check', assignee: 'Sunita Devi', assigneeInitials: 'SD', status: 'done', priority: 'routine' },
]

export const LEADERBOARD: LeaderRow[] = [
  { rank: 1, sector: 'Devali', initials: 'DV', score: 98 },
  { rank: 2, sector: 'Kolyari', initials: 'KL', score: 91 },
  { rank: 3, sector: 'Salumber (You)', initials: 'AK', score: 87, isYou: true },
  { rank: 4, sector: 'Jhallara', initials: 'JH', score: 82 },
  { rank: 5, sector: 'Semari', initials: 'SM', score: 78 },
]
