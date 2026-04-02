import { useState, useRef, useEffect, useCallback } from 'react';
import './DemoChat.css';

const API_BASE = import.meta.env.VITE_DEMO_API_URL || 'https://demo-api.knowtheclaw.com';

export default function DemoChat() {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messagesRemaining, setMessagesRemaining] = useState(null);
  const [sessionState, setSessionState] = useState('idle'); // idle | active | expired | disabled
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const startSession = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/session/create`, { method: 'POST' });
      const data = await res.json();

      if (!res.ok) {
        if (data.error === 'demo_disabled') {
          setSessionState('disabled');
          setError(data.message);
        } else {
          setError(data.message || 'Could not start session.');
        }
        return;
      }

      setSessionId(data.sessionId);
      setSessionState('active');
      setMessages([{
        role: 'claw',
        content: "Hey — I'm a live OpenClaw instance running on a real server. I can search the web, summarize content, and answer questions about OpenClaw. What do you want to try?",
      }]);

      setTimeout(() => inputRef.current?.focus(), 100);
    } catch (err) {
      setError('Could not connect to the demo. Try again in a moment.');
    } finally {
      setLoading(false);
    }
  }, []);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || !sessionId || loading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'visitor', content: text }]);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/session/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === 'session_expired') {
          setSessionState('expired');
          setError('Session expired. Start a new one to continue.');
        } else if (data.error === 'message_limit') {
          setError(data.message);
        } else {
          setError(data.message || 'Something went wrong.');
        }
        return;
      }

      setMessages(prev => [...prev, { role: 'claw', content: data.response }]);
      setMessagesRemaining(data.messagesRemaining);
    } catch (err) {
      setError('Connection lost. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const endSession = async () => {
    if (sessionId) {
      try {
        await fetch(`${API_BASE}/api/session/end`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
      } catch {}
    }
    setSessionId(null);
    setMessages([]);
    setSessionState('idle');
    setError(null);
    setMessagesRemaining(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Idle state — show start button
  if (sessionState === 'idle' || sessionState === 'disabled') {
    return (
      <div className="demo-chat">
        <div className="demo-chat-start">
          <div className="demo-chat-icon">&#9670;</div>
          <h3>Talk to a real claw.</h3>
          <p>
            This is a live OpenClaw instance running in a restricted demo environment.
            It can search the web, summarize content, and answer questions about OpenClaw in real time.
          </p>
          {error && <p className="demo-chat-error">{error}</p>}
          <button
            className="demo-chat-start-btn"
            onClick={startSession}
            disabled={loading || sessionState === 'disabled'}
          >
            {loading ? 'Connecting...' : 'Start Demo'}
          </button>
        </div>
      </div>
    );
  }

  // Active / expired state — show chat
  return (
    <div className="demo-chat">
      <div className="demo-chat-header">
        <div className="demo-chat-header-left">
          <span className={`demo-chat-status ${sessionState === 'active' ? 'active' : 'expired'}`} />
          <span className="demo-chat-title">TheClaw</span>
          <span className="demo-chat-badge">LIVE DEMO</span>
        </div>
        <button className="demo-chat-end" onClick={endSession}>End</button>
      </div>

      <div className="demo-chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`demo-chat-msg ${msg.role}`}>
            <div className="demo-chat-msg-content">{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div className="demo-chat-msg claw">
            <div className="demo-chat-msg-content demo-chat-typing">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && <div className="demo-chat-error-bar">{error}</div>}

      <div className="demo-chat-input-area">
        {sessionState === 'expired' ? (
          <button className="demo-chat-start-btn" onClick={() => { endSession(); setTimeout(startSession, 100); }}>
            Start New Session
          </button>
        ) : (
          <>
            <input
              ref={inputRef}
              type="text"
              className="demo-chat-input"
              placeholder="Ask the claw something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              maxLength={500}
            />
            <button
              className="demo-chat-send"
              onClick={sendMessage}
              disabled={!input.trim() || loading}
            >
              Send
            </button>
          </>
        )}
      </div>

      {messagesRemaining !== null && messagesRemaining <= 5 && (
        <div className="demo-chat-remaining">
          {messagesRemaining} message{messagesRemaining !== 1 ? 's' : ''} remaining in this session
        </div>
      )}

      <div className="demo-chat-footer">
        Sandboxed OpenClaw instance &middot; web search + summarization &middot; no personal data collected
      </div>
    </div>
  );
}
