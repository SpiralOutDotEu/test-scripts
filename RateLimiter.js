class RateLimiter {
  constructor(tokensPerInterval, interval) {
    this.tokensPerInterval = tokensPerInterval;
    this.interval = interval;
    this.tokens = tokensPerInterval;
    this.lastRefill = Date.now();
  }

  refillTokens() {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    const tokensToAdd = Math.floor(elapsed / this.interval) * this.tokensPerInterval;
    if (tokensToAdd > 0) {
      this.tokens = Math.min(this.tokens + tokensToAdd, this.tokensPerInterval);
      this.lastRefill = now;
    }
  }

  tryRemoveTokens(count) {
    this.refillTokens();
    if (this.tokens >= count) {
      this.tokens -= count;
      return true;
    }
    return false;
  }
}

// Usage
const limiter = new RateLimiter(5, 1000); // 5 tokens per second

function handleRequest(req, res) {
  if (limiter.tryRemoveTokens(1)) {
    res.status(200).send('Request successful');
  } else {
    res.status(429).send('Rate limit exceeded');
  }
}

// Simulate incoming requests
setInterval(() => handleRequest({}, { status: code => ({ send: msg => console.log(code, msg) }) }), 100);
