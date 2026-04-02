// Simple structured logger. No PII in logs.
function log(level, event, data = {}) {
  const entry = {
    ts: new Date().toISOString(),
    level,
    event,
    ...data,
  };
  console.log(JSON.stringify(entry));
}

module.exports = {
  info: (event, data) => log('info', event, data),
  warn: (event, data) => log('warn', event, data),
  error: (event, data) => log('error', event, data),
};
