class RateLimiter {
  constructor(maxRequests, refillInterval) {
    this.maxRequests = maxRequests;
    this.refillInterval = refillInterval;
    this.users = new Map();
  }

  _refillTokens(userId) {
    const currentTime = Date.now;
    const userData = this.users.get(userId);

    if (!userData) {
      this.users.set(userId, {
        tokens: this.maxRequests,
        lastRefillTime: currentTime,
      });
      return;
    }

    const { tokens, lastRefillTime } = userData;
    const timeElapsed = currentTime - lastRefillTime;
    const tokensToAdd = Math.floor(timeElapsed / this.refillInterval);

    if (tokensToAdd > 0) {
        const newTokens = Math.min(tokens + tokensToAdd, this.maxRequests);
        this.users.set(userId, { tokens: newTokens, lastRefillTime: currentTime });
      } else {
        this.users.set(userId, { tokens, lastRefillTime });
      }
  }

  isAllowed(userId) {
    this._refillTokens(userId);
    const userData = this.users.get(userId);

    if (userData.tokens > 0) {
      this.users.set(userId, {
        tokens: userData.tokens - 1,
        lastRefillTime: userData.lastRefillTime,
      });
      return true;
    }
    return false;
  }
}


// example
const rateLimiter = new RateLimiter(5, 1000); 

setInterval(() => {
    console.log(rateLimiter.isAllowed('user1'));
  }, 1200);