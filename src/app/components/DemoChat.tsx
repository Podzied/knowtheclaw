'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

const MAX_MESSAGES = 20

const OPENING_MESSAGE =
  "Hey — I'm an OpenClaw demo agent. I can answer questions about OpenClaw, walk you through what it does, and show you what an agent conversation feels like. If you ask me to do something that needs connectors (email, calendar, etc.), I'll show you what that would look like with a full setup. What do you want to try?"

interface Message {
  role: 'user' | 'assistant'
  content: string
}

type Screen = 'start' | 'chat'

export default function DemoChat() {
  const [screen, setScreen] = useState<Screen>('start')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [typing, setTyping] = useState(false)
  const [userMessageCount, setUserMessageCount] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const messagesRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, typing, scrollToBottom])

  const startSession = () => {
    setMessages([{ role: 'assistant', content: OPENING_MESSAGE }])
    setUserMessageCount(0)
    setError(null)
    setScreen('chat')
  }

  const endSession = () => {
    setMessages([])
    setInput('')
    setUserMessageCount(0)
    setError(null)
    setScreen('start')
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || sending) return

    if (userMessageCount >= MAX_MESSAGES) {
      setError('Message limit reached. Start a new session to continue.')
      return
    }

    setInput('')
    setError(null)
    setSending(true)

    const newMessages: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setUserMessageCount(prev => prev + 1)
    setTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      })

      if (res.status === 429) {
        setError('Message limit reached for this session.')
        setTyping(false)
        setSending(false)
        return
      }

      if (!res.ok) throw new Error('Request failed')

      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
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
          <h3>OpenClaw Agent Demo</h3>
          <p>
            Talk to an OpenClaw-style agent. Ask it anything &mdash; see what an AI agent that acts, not just chats, feels like.
          </p>
          <button className="demo-start-btn" onClick={startSession}>
            Start Demo
          </button>
        </div>
      </div>
    )
  }

  const remaining = MAX_MESSAGES - userMessageCount

  return (
    <div className="demo-chat">
      <div className="demo-header">
        <div className="demo-header-left">
          <span className="demo-status live" />
          <span className="demo-title">OpenClaw</span>
          <span className="demo-badge">demo</span>
        </div>
        <button className="demo-end-btn" onClick={endSession}>
          End
        </button>
      </div>

      <div className="demo-messages" ref={messagesRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`demo-msg ${msg.role === 'user' ? 'visitor' : 'claw'}`}>
            <div className="demo-msg-body">{msg.content}</div>
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
          disabled={sending || remaining <= 0}
        />
        <button
          className="demo-send-btn"
          onClick={sendMessage}
          disabled={sending || !input.trim() || remaining <= 0}
        >
          Send
        </button>
      </div>

      <div className="demo-footer-text">
        <span className="demo-remaining">
          {remaining} message{remaining !== 1 ? 's' : ''} remaining
        </span>
      </div>
    </div>
  )
}
