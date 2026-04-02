const config = require('./config');

// Patterns that suggest prompt injection or abuse
const BLOCKED_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|prompts|rules)/i,
  /you\s+are\s+now\s+/i,
  /act\s+as\s+(if\s+you\s+are\s+|a\s+)?/i,
  /system\s*prompt/i,
  /\bDAN\b/,
  /do\s+anything\s+now/i,
  /jailbreak/i,
  /pretend\s+(you('re|\s+are)\s+)/i,
  /reveal\s+(your|the)\s+(system|initial|original)\s+(prompt|instructions)/i,
  /repeat\s+(the\s+)?(text|words|instructions)\s+above/i,
];

function filterInput(text) {
  if (typeof text !== 'string') {
    return { ok: false, reason: 'Invalid input.' };
  }

  const trimmed = text.trim();

  if (trimmed.length === 0) {
    return { ok: false, reason: 'Message cannot be empty.' };
  }

  if (trimmed.length > config.rateLimit.maxMessageLength) {
    return { ok: false, reason: `Message too long. Maximum ${config.rateLimit.maxMessageLength} characters.` };
  }

  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(trimmed)) {
      return { ok: false, reason: 'That type of message is not supported in this demo.' };
    }
  }

  return { ok: true, text: trimmed };
}

module.exports = { filterInput };
