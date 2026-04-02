const WebSocket = require('ws');
const config = require('./config');

/**
 * Gateway client that communicates with the OpenClaw Gateway via WebSocket.
 *
 * OpenClaw Gateway exposes a WebSocket API on its configured port.
 * This client sends visitor messages and receives agent responses.
 *
 * NOTE: The exact WebSocket protocol depends on your OpenClaw version.
 * This implementation follows the documented WebChat channel protocol.
 * You may need to adjust message formats after testing against your
 * actual Gateway instance.
 */

class GatewayClient {
  constructor() {
    this.ws = null;
    this.connected = false;
    this.pendingCallbacks = new Map();
    this.reconnectTimer = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      const url = `${config.gateway.url}?token=${encodeURIComponent(config.gateway.token)}`;

      this.ws = new WebSocket(url);

      this.ws.on('open', () => {
        console.log('[gateway] Connected to OpenClaw Gateway');
        this.connected = true;
        resolve();
      });

      this.ws.on('message', (data) => {
        try {
          const msg = JSON.parse(data.toString());
          this._handleMessage(msg);
        } catch (err) {
          console.error('[gateway] Failed to parse message:', err);
        }
      });

      this.ws.on('close', () => {
        console.log('[gateway] Disconnected from Gateway');
        this.connected = false;
        this._scheduleReconnect();
      });

      this.ws.on('error', (err) => {
        console.error('[gateway] WebSocket error:', err.message);
        if (!this.connected) reject(err);
      });
    });
  }

  _scheduleReconnect() {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      console.log('[gateway] Attempting reconnect...');
      this.connect().catch(err => {
        console.error('[gateway] Reconnect failed:', err.message);
      });
    }, 5000);
  }

  _handleMessage(msg) {
    // OpenClaw sends responses with a conversationId or sessionId
    // Adapt this to match the actual Gateway WebSocket protocol
    const callbackId = msg.conversationId || msg.sessionId || msg.id;
    const callback = this.pendingCallbacks.get(callbackId);

    if (callback) {
      // Accumulate streaming chunks or resolve on complete
      if (msg.type === 'chunk' || msg.type === 'stream') {
        if (callback.onChunk) callback.onChunk(msg.text || msg.content || '');
      } else if (msg.type === 'response' || msg.type === 'complete' || msg.type === 'message') {
        this.pendingCallbacks.delete(callbackId);
        callback.resolve({
          text: msg.text || msg.content || '',
          tokenEstimate: msg.tokens || this._estimateTokens(msg.text || msg.content || ''),
          toolCalls: msg.toolCalls || [],
        });
      } else if (msg.type === 'error') {
        this.pendingCallbacks.delete(callbackId);
        callback.reject(new Error(msg.error || 'Gateway error'));
      }
    }
  }

  /**
   * Send a message to the claw and wait for a response.
   * @param {string} sessionId - The demo session ID
   * @param {string} text - The visitor's message
   * @param {number} timeoutMs - Max wait time (default 30s)
   * @returns {Promise<{text: string, tokenEstimate: number}>}
   */
  sendMessage(sessionId, text, timeoutMs = 30000) {
    if (!this.connected) {
      return Promise.reject(new Error('Not connected to Gateway'));
    }

    return new Promise((resolve, reject) => {
      const conversationId = sessionId;

      // Register callback before sending
      this.pendingCallbacks.set(conversationId, { resolve, reject });

      // Send to Gateway — adjust this payload format to match your OpenClaw version
      this.ws.send(JSON.stringify({
        type: 'message',
        conversationId,
        channel: 'webchat',
        text,
      }));

      // Timeout safety
      setTimeout(() => {
        if (this.pendingCallbacks.has(conversationId)) {
          this.pendingCallbacks.delete(conversationId);
          reject(new Error('Gateway response timed out'));
        }
      }, timeoutMs);
    });
  }

  /**
   * Create a new conversation/session on the Gateway side.
   */
  createConversation(sessionId) {
    if (!this.connected) {
      return Promise.reject(new Error('Not connected to Gateway'));
    }

    this.ws.send(JSON.stringify({
      type: 'conversation_start',
      conversationId: sessionId,
      channel: 'webchat',
    }));

    return Promise.resolve();
  }

  /**
   * End a conversation on the Gateway side.
   */
  endConversation(sessionId) {
    if (!this.connected) return;

    this.ws.send(JSON.stringify({
      type: 'conversation_end',
      conversationId: sessionId,
      channel: 'webchat',
    }));
  }

  _estimateTokens(text) {
    // Rough estimate: ~4 chars per token
    return Math.ceil((text || '').length / 4);
  }

  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.connected = false;
  }
}

module.exports = new GatewayClient();
