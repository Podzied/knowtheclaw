const { v4: uuidv4 } = require('uuid');
const config = require('./config');

// In-memory session store (swap for Redis at scale)
const sessions = new Map();
// Track sessions per IP: ip -> [{ createdAt }]
const ipSessions = new Map();

function createSession(ip) {
  // Enforce per-IP session limit
  const now = Date.now();
  const hourAgo = now - 60 * 60 * 1000;
  const ipHistory = (ipSessions.get(ip) || []).filter(s => s.createdAt > hourAgo);

  if (ipHistory.length >= config.rateLimit.maxSessionsPerIpPerHour) {
    return { error: 'rate_limited', message: 'Too many sessions. Try again later.' };
  }

  const sessionId = uuidv4();
  const session = {
    id: sessionId,
    ip,
    createdAt: now,
    lastActivity: now,
    messageCount: 0,
    messages: [],
    tokenEstimate: 0,
    active: true,
  };

  sessions.set(sessionId, session);
  ipHistory.push({ createdAt: now });
  ipSessions.set(ip, ipHistory);

  return { sessionId };
}

function getSession(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) return null;
  if (!session.active) return null;

  // Check timeout
  const timeoutMs = config.session.timeoutMinutes * 60 * 1000;
  if (Date.now() - session.lastActivity > timeoutMs) {
    session.active = false;
    return null;
  }

  return session;
}

function addMessage(sessionId, role, content) {
  const session = sessions.get(sessionId);
  if (!session) return;

  session.messages.push({ role, content, timestamp: Date.now() });
  session.messageCount++;
  session.lastActivity = Date.now();
}

function addTokenEstimate(sessionId, tokens) {
  const session = sessions.get(sessionId);
  if (!session) return;
  session.tokenEstimate += tokens;
}

function getMessages(sessionId) {
  const session = getSession(sessionId);
  if (!session) return null;
  return session.messages;
}

function endSession(sessionId) {
  const session = sessions.get(sessionId);
  if (session) {
    session.active = false;
  }
}

function isAtMessageLimit(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) return true;
  return session.messageCount >= config.rateLimit.maxMessagesPerSession;
}

// Cleanup expired sessions every 5 minutes
setInterval(() => {
  const timeoutMs = config.session.timeoutMinutes * 60 * 1000;
  const now = Date.now();
  for (const [id, session] of sessions) {
    if (now - session.lastActivity > timeoutMs) {
      sessions.delete(id);
    }
  }
  // Clean old IP tracking entries
  const hourAgo = now - 60 * 60 * 1000;
  for (const [ip, history] of ipSessions) {
    const filtered = history.filter(s => s.createdAt > hourAgo);
    if (filtered.length === 0) {
      ipSessions.delete(ip);
    } else {
      ipSessions.set(ip, filtered);
    }
  }
}, 5 * 60 * 1000);

module.exports = {
  createSession,
  getSession,
  addMessage,
  addTokenEstimate,
  getMessages,
  endSession,
  isAtMessageLimit,
};
