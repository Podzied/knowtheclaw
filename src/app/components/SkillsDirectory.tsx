'use client'

import { useState, useMemo } from 'react'

interface Skill {
  name: string
  category: string
  badge: string
  official?: boolean
  desc: string
  meta: string
}

const skills: Skill[] = [
  { name: 'GOG (Google Workspace)', category: 'productivity', badge: 'Popular', desc: 'Gmail, Calendar, Drive, Contacts, Sheets, and Docs through a single CLI integration.', meta: '14k+ downloads \u00b7 @nicepkg' },
  { name: 'Capability Evolver', category: 'productivity', badge: 'Popular', desc: 'Lets the agent automatically improve its own capabilities over time.', meta: '35k+ downloads \u00b7 community' },
  { name: 'Obsidian', category: 'productivity', badge: '', desc: 'Read, create, organize, and update notes in your Obsidian vault.', meta: 'community \u00b7 knowledge mgmt' },
  { name: 'Summarize', category: 'productivity', badge: '', desc: 'Turns long content into structured summaries.', meta: 'community \u00b7 bundled-ready' },
  { name: 'Tavily Search', category: 'search', badge: 'Popular', desc: 'AI-optimized web search that returns structured results.', meta: 'community \u00b7 search' },
  { name: 'Exa Search', category: 'search', badge: '', desc: 'Developer-focused search index pulling from docs, GitHub repos.', meta: 'community \u00b7 dev search' },
  { name: 'ElevenLabs Agent', category: 'comms', badge: '', desc: 'Voice AI integration with failsafe: if text/email fails, the agent makes an actual phone call.', meta: 'community \u00b7 voice' },
  { name: 'WhatsApp CLI', category: 'comms', badge: '', desc: 'Message third parties on WhatsApp, sync and search your WhatsApp history.', meta: '@nicepkg \u00b7 messaging' },
  { name: 'N8N Workflow', category: 'dev', badge: '', desc: 'Chat-driven control over your local N8N instance.', meta: 'community \u00b7 automation' },
  { name: 'Vercel', category: 'dev', badge: '', desc: 'Plain English commands that translate to Vercel CLI actions.', meta: 'community \u00b7 deployment' },
  { name: 'Home Assistant', category: 'productivity', badge: '', desc: 'Natural language control over your smart home. Fully local.', meta: 'community \u00b7 smart home' },
  { name: 'OpenAI Whisper', category: 'dev', badge: '', desc: 'Runs Whisper locally for fast, accurate transcriptions.', meta: 'community \u00b7 audio' },
  { name: 'Skill Vetter', category: 'security', badge: 'Essential', desc: 'Scans other skills for red flags before and after installation.', meta: '3.5k downloads \u00b7 security' },
  { name: 'Credential Manager', category: 'security', badge: 'Essential', official: true, desc: 'Mandatory security foundation for OpenClaw.', meta: 'first-party \u00b7 security' },
  { name: 'ClawdStrike', category: 'security', badge: '', desc: 'Security audit and threat model for OpenClaw gateway hosts.', meta: 'community \u00b7 audit' },
  { name: 'Domain Trust Check', category: 'security', badge: '', desc: 'Check any URL for phishing, malware, brand abuse.', meta: 'community \u00b7 safety' },
  { name: 'Composio', category: 'dev', badge: 'Popular', desc: 'One integration that connects 860+ external tools.', meta: 'composio.dev \u00b7 integrations' },
  { name: 'Ontology', category: 'productivity', badge: '', desc: 'Organizes knowledge into structured concepts and relationships.', meta: 'community \u00b7 knowledge' },
]

const categories = ['all', 'productivity', 'search', 'comms', 'dev', 'security']

export default function SkillsDirectory() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    return skills.filter((s) => {
      const matchesFilter = filter === 'all' || s.category === filter
      const matchesSearch =
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.desc.toLowerCase().includes(search.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [search, filter])

  return (
    <div>
      <div className="skills-controls">
        <input
          className="skills-search"
          type="text"
          placeholder="Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="skills-empty">No skills match your search.</div>
      ) : (
        <div className="skills-grid">
          {filtered.map((skill) => (
            <div key={skill.name} className="skill-card">
              <div className="skill-card-top">
                <span className="skill-name">{skill.name}</span>
                {skill.badge && (
                  <span className={`skill-badge ${skill.official ? 'official' : ''}`}>
                    {skill.badge}
                  </span>
                )}
              </div>
              <div className="skill-desc">{skill.desc}</div>
              <div className="skill-meta">{skill.meta}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
