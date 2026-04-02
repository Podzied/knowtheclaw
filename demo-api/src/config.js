const config = {
  port: parseInt(process.env.PORT || '3001', 10),

  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  },

  cors: {
    origin: process.env.ALLOWED_ORIGIN || 'https://knowtheclaw.com',
  },

  rateLimit: {
    maxMessagesPerSession: parseInt(process.env.MAX_MESSAGES_PER_SESSION || '25', 10),
    maxSessionsPerIpPerHour: parseInt(process.env.MAX_SESSIONS_PER_IP_PER_HOUR || '5', 10),
    maxMessageLength: parseInt(process.env.MAX_MESSAGE_LENGTH || '500', 10),
  },

  session: {
    timeoutMinutes: parseInt(process.env.SESSION_TIMEOUT_MINUTES || '20', 10),
  },

  cost: {
    monthlyBudgetCents: parseInt(process.env.MONTHLY_BUDGET_CENTS || '8000', 10),
    alertPercent: parseInt(process.env.BUDGET_ALERT_PERCENT || '80', 10),
  },

  killSwitch: {
    disabled: process.env.DEMO_DISABLED === 'true',
    message: process.env.DEMO_DISABLED_MESSAGE || 'The live demo is temporarily offline. Check back soon.',
  },
};

module.exports = config;
