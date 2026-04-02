require('dotenv/config');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const config = require('./config');
const sessions = require('./sessions');
const { filterInput } = require('./filter');
const cost = require('./cost');
const openai = require('./openai');
const log = require('./logger');

const app = express();

// ── Middleware ──────────────────────────────────────────────

app.use(helmet());
app.use(express.json({ limit: '4kb' }));

app.use(cors({
  origin: config.cors.origin,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Global rate limiter: 60 requests per minute per IP
app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip,
}));

// Trust proxy (behind nginx)
app.set('trust proxy', 1);

// ── Kill switch check ──────────────────────────────────────

function checkKillSwitch(req, res, next) {
  // Re-read env var each time so you can flip it without restart
  if (process.env.DEMO_DISABLED === 'true' || config.killSwitch.disabled) {
    return res.status(503).json({
      error: 'demo_disabled',
      message: process.env.DEMO_DISABLED_MESSAGE || config.killSwitch.message,
    });
  }
  next();
}

function checkBudget(req, res, next) {
  if (cost.isBudgetExceeded()) {
    log.warn('budget_exceeded', cost.getStatus());
    return res.status(503).json({
      error: 'budget_exceeded',
      message: 'The live demo has reached its monthly usage limit. Check back next month.',
    });
  }
  next();
}

// ── Routes ─────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', cost: cost.getStatus() });
});

// POST /api/session/create
app.post('/api/session/create', checkKillSwitch, checkBudget, async (req, res) => {
  const ip = req.ip;
  const result = sessions.createSession(ip);

  if (result.error) {
    log.warn('session_rate_limited', { ip });
    return res.status(429).json(result);
  }

  log.info('session_created', { sessionId: result.sessionId });
  res.json({ sessionId: result.sessionId });
});

// POST /api/session/message
app.post('/api/session/message', checkKillSwitch, checkBudget, async (req, res) => {
  const { sessionId, message } = req.body;

  if (!sessionId || !message) {
    return res.status(400).json({ error: 'missing_fields', message: 'sessionId and message are required.' });
  }

  // Validate session
  const session = sessions.getSession(sessionId);
  if (!session) {
    return res.status(404).json({ error: 'session_expired', message: 'Session not found or expired. Start a new one.' });
  }

  // Check message limit
  if (sessions.isAtMessageLimit(sessionId)) {
    return res.status(429).json({
      error: 'message_limit',
      message: `You've reached the ${config.rateLimit.maxMessagesPerSession}-message limit for this session. Start a new session to continue.`,
    });
  }

  // Filter input
  const filtered = filterInput(message);
  if (!filtered.ok) {
    return res.status(400).json({ error: 'input_rejected', message: filtered.reason });
  }

  // Record visitor message
  sessions.addMessage(sessionId, 'visitor', filtered.text);

  try {
    // Send to OpenAI and wait for response
    const response = await openai.sendMessage(sessionId, filtered.text);

    // Track cost
    cost.trackTokens(response.tokenEstimate);
    sessions.addTokenEstimate(sessionId, response.tokenEstimate);

    if (cost.isAlertThreshold()) {
      log.warn('budget_alert', cost.getStatus());
    }

    // Record agent response (strip any tool call details from visitor-facing response)
    const cleanText = response.text;
    sessions.addMessage(sessionId, 'claw', cleanText);

    log.info('message_exchanged', {
      sessionId,
      tokens: response.tokenEstimate,
      messageCount: session.messageCount,
    });

    res.json({
      response: cleanText,
      messagesRemaining: config.rateLimit.maxMessagesPerSession - session.messageCount,
    });
  } catch (err) {
    log.error('openai_message_failed', { sessionId, error: err.message });
    res.status(502).json({
      error: 'ai_error',
      message: 'The claw is having trouble responding. Try again in a moment.',
    });
  }
});

// GET /api/session/messages
app.get('/api/session/messages', (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(400).json({ error: 'missing_fields', message: 'sessionId is required.' });
  }

  const messages = sessions.getMessages(sessionId);
  if (!messages) {
    return res.status(404).json({ error: 'session_expired', message: 'Session not found or expired.' });
  }

  res.json({ messages });
});

// POST /api/session/end
app.post('/api/session/end', (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: 'missing_fields', message: 'sessionId is required.' });
  }

  sessions.endSession(sessionId);
  openai.endConversation(sessionId);
  log.info('session_ended', { sessionId });

  res.json({ status: 'ended' });
});

// ── Start ──────────────────────────────────────────────────

async function start() {
  if (!config.openai.apiKey) {
    log.warn('no_openai_key', { message: 'OPENAI_API_KEY not set. Messages will fail.' });
  }

  app.listen(config.port, '127.0.0.1', () => {
    log.info('broker_started', { port: config.port, model: config.openai.model });
    console.log(`\n  KnowTheClaw Demo API running on http://127.0.0.1:${config.port}\n`);
    console.log(`  Model: ${config.openai.model}\n`);
  });
}

start();
