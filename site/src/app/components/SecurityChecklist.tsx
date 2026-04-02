'use client'

import { useState } from 'react'

interface CheckItem {
  text: string
  id: string
}

interface CheckGroup {
  title: string
  source: string
  items: CheckItem[]
}

const groups: CheckGroup[] = [
  {
    title: 'Isolation',
    source: 'Microsoft Security Blog',
    items: [
      { id: 'iso-1', text: 'Run on a dedicated machine or VM' },
      { id: 'iso-2', text: 'Use dedicated accounts (not your daily driver)' },
      { id: 'iso-3', text: 'Don\u2019t run as root' },
    ],
  },
  {
    title: 'Network & Authentication',
    source: 'OpenClaw Security Docs',
    items: [
      { id: 'net-1', text: 'Enable gateway authentication' },
      { id: 'net-2', text: 'Bind to localhost only (unless LAN needed)' },
      { id: 'net-3', text: 'Lock down DM policies \u2014 run openclaw doctor to audit' },
    ],
  },
  {
    title: 'Skills & Execution',
    source: 'OpenClaw Docs + VirusTotal Partnership',
    items: [
      { id: 'skill-1', text: 'Review every skill before installing' },
      { id: 'skill-2', text: 'Check VirusTotal reports on skill packages' },
      { id: 'skill-3', text: 'Use the strongest model you can afford' },
    ],
  },
  {
    title: 'Maintenance',
    source: 'SlowMist Guide + DigitalOcean',
    items: [
      { id: 'maint-1', text: 'Keep OpenClaw updated (see CVE-2026-25253)' },
      { id: 'maint-2', text: 'Rotate gateway tokens regularly' },
      { id: 'maint-3', text: 'Monitor agent activity and logs' },
    ],
  },
]

const totalItems = groups.reduce((sum, g) => sum + g.items.length, 0)

export default function SecurityChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const pct = Math.round((checked.size / totalItems) * 100)

  return (
    <div>
      <div className="check-progress">
        <div className="check-bar">
          <div className="check-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="check-pct">{pct}%</span>
      </div>

      {groups.map((group) => (
        <div key={group.title} className="check-group">
          <div className="check-group-title">{group.title}</div>
          <div className="check-group-src">{group.source}</div>
          {group.items.map((item) => (
            <div
              key={item.id}
              className={`check-item ${checked.has(item.id) ? 'checked' : ''}`}
              onClick={() => toggle(item.id)}
            >
              <span className="check-box" />
              <span className="check-text">{item.text}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
