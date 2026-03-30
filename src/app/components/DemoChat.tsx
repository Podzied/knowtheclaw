'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

const API_URL = process.env.NEXT_PUBLIC_DEMO_API_URL || 'https://demo-api.knowtheclaw.com'

const OPENING_MESSAGE =
  "Hey — I'm a live OpenClaw instance running on a real server. I can search the web, summarize content, and answer questions about OpenClaw. What do you want to try?"

interface Message {
  role: 'visitor' | 'claw'
  text: string
}

type Screen = 'start' | 'chat'

export default function DemoChat() {
  const [screen, setScreen] = useState<Screen>('start')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [typing, setTyping] = useState(false)
  const [remaining, setRemaining] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [startError, setStartError] = useState<string | null>(null)
  const [alive, setAlive] = useState(true)
  const messagesRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, typing, scrollToBottom])

  const startSession = async () => {
    setStartError(null)
    try {
      const res = await fetch(`${API_URL}/api/session/create`, { method: 'POST' })
      if (!res.ok) throw new Error('Failed to create session')
      const data = await res.json()
      setSessionId(data.sessionId)
      setMessages([{ role: 'claw', text: OPENING_MESSAGE }])
      setAlive(true)
      setScreen('chat')
    } catch {
      setStartError('Could not connect to the demo server. Try again in a moment.')
    }
  }

  const endSession = async () => {
    if (sessionId) {
      try {
        await fetch(`${API_URL}/api/session/end`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })
      } catch {
        // ignore cleanup errors
      }
    }
    setSessionId(null)
    setMessages([])
    setInput('')
    setRemaining(null)
    setError(null)
    setAlive(true)
    setScreen('start')
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || !sessionId || sending) return

    setInput('')
    setError(null)
    setSending(true)
    setMessages((prev) => [...prev, { role: 'visitor', text }])
    setTyping(true)

    try {
      const res = await fetch(`${API_URL}/api/session/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text }),
      })

      if (res.status === 410) {
        setAlive(false)
        setError('Session expired. Start a new demo to continue.')
        setTyping(false)
        setSending(false)
        return
      }

      if (res.status === 429) {
        setError('Message limit reached for this session.')
        setTyping(false)
        setSending(false)
        return
      }

      if (!res.ok) throw new Error('Request failed')

      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'claw', text: data.response }])
      setRemaining(data.messagesRemaining)
    } catch {
      setError('Connection error. Check your network and try again.')
    } finally {
      setTyping(false)
      setSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (screen === 'start') {
    return (
      <div className="demo-chat">
        <div className="demo-start">
          <div className="demo-start-icon">&#x1f9ea;</div>
          <h3>Live Demo</h3>
          <p>
            Talk to a real OpenClaw instance. It&rsquo;s running on a server right now &mdash; not a
            simulation.
          </p>
          {startError && <div className="demo-error">{startError}</div>}
          <button className="demo-start-btn" onClick={startSession}>
            Start Demo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="demo-chat">
      <div className="demo-header">
        <div className="demo-header-left">
          <span className={`demo-status ${alive ? 'live' : 'dead'}`} />
          <span className="demo-title">OpenClaw</span>
          <span className="demo-badge">demo</span>
        </div>
        <button className="demo-end-btn" onClick={endSession}>
          End
        </button>
      </div>

      <div className="demo-messages" ref={messagesRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`demo-msg ${msg.role}`}>
            <div className="demo-msg-body">{msg.text}</div>
          </div>
        ))}
        {typing && (
          <div className="demo-msg claw">
            <div className="demo-msg-body demo-typing">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>

      {error && <div className="demo-error-bar">{error}</div>}

      <div className="demo-input-area">
        <input
          className="demo-input"
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={sending || !alive}
        />
        <button
          className="demo-send-btn"
          onClick={sendMessage}
          disabled={sending || !input.trim() || !alive}
        >
          Send
        </button>
      </div>

      <div className="demo-footer-text">
        {remaining !== null && (
          <span className="demo-remaining">
            {remaining} message{remaining !== 1 ? 's' : ''} remaining
          </span>
        )}
      </div>
    </div>
  )
}
