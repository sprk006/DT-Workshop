import { useState } from 'react'
import { AppHeader } from '../components/AppHeader'
import { TASKS } from '../data/mock'
import type { Task, TaskStatus } from '../types'

const COLUMNS: { key: TaskStatus; label: string }[] = [
  { key: 'todo', label: 'To-do' },
  { key: 'doing', label: 'In progress' },
  { key: 'done', label: 'Done' },
]

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(TASKS)
  const [filter, setFilter] = useState<TaskStatus | 'all'>('all')

  const advance = (id: string) =>
    setTasks((ts) =>
      ts.map((t) => {
        if (t.id !== id) return t
        const next: Record<TaskStatus, TaskStatus> = { todo: 'doing', doing: 'done', done: 'done' }
        return { ...t, status: next[t.status], progress: next[t.status] === 'done' ? 100 : t.progress }
      }),
    )

  const shown = COLUMNS.filter((c) => filter === 'all' || c.key === filter)

  return (
    <div className="screen">
      <AppHeader title="Follow-up tasks" subtitle="From your AAM meetings" />
      <div className="screen-body">
        <div className="segmented">
          {(['all', 'todo', 'doing', 'done'] as const).map((f) => (
            <button
              key={f}
              className={`seg ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : f === 'todo' ? 'To-do' : f === 'doing' ? 'Doing' : 'Done'}
            </button>
          ))}
        </div>

        {shown.map((col) => {
          const items = tasks.filter((t) => t.status === col.key)
          return (
            <div key={col.key} className="task-col">
              <div className="section-label">{col.label} · {items.length}</div>
              {items.length === 0 && <p className="muted empty-line">Nothing here.</p>}
              {items.map((t) => (
                <div key={t.id} className={`card task-card ${t.status === 'done' ? 'task-done' : ''}`}>
                  <div className="task-top">
                    <span className={`avatar-mini ${t.status !== 'todo' ? 'confirmed' : ''}`}>{t.assigneeInitials}</span>
                    <div className="task-meta">
                      <span className={`task-title ${t.status === 'done' ? 'strike' : ''}`}>{t.title}</span>
                      <span className="muted">{t.assignee}</span>
                    </div>
                    {t.priority === 'high' && t.status !== 'done' && <span className="chip chip-pink">High</span>}
                  </div>
                  {t.status === 'doing' && typeof t.progress === 'number' && (
                    <div className="progress-track"><div className="progress-fill" style={{ width: `${t.progress}%` }} /></div>
                  )}
                  {t.status !== 'done' && (
                    <button className="task-advance" onClick={() => advance(t.id)}>
                      {t.status === 'todo' ? 'Start →' : 'Mark done ✓'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
