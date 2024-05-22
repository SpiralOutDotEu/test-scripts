// < Interfaces
class Storage {
  save(shortURL, longURL) {
    throw new Error("save method must be implemented");
  }

  get(shortURL) {
    throw new Error("get method must be implemented");
  }
}

class Hasher {
  hash(longURL) {
    throw new Error("hash method must be implemented");
  }
}
//>

// Implementations

class InMemoryStorage extends Storage {
    constructor() {
      super();
      this.urlMap = new Map();
    }
  
    save(shortURL, longURL) {
      this.urlMap.set(shortURL, longURL);
    }
  
    get(shortURL) {
      return this.urlMap.get(shortURL) || null;
    }
  }

// md5 hash
const crypto = require('crypto');

class MD5Hasher extends Hasher {
  hash(longURL) {
    return crypto.createHash('md5').update(longURL).digest('hex').slice(0, 6);
  }
}

class URLShortener {
    constructor(storage, hasher, baseURL = 'http://short.ly/') {
      this.storage = storage;
      this.hasher = hasher;
      this.baseURL = baseURL;
    }
  
    shortenURL(longURL) {
      const hash = this.hasher.hash(longURL);
      const shortURL = this.baseURL + hash;
      this.storage.save(shortURL, longURL);
      return shortURL;
    }
  
    getLongURL(shortURL) {
      return this.storage.get(shortURL);
    }
  }
  
  // Dependency Injection
  const storage = new InMemoryStorage();
  const hasher = new MD5Hasher();
  const urlShortener = new URLShortener(storage, hasher);
  
  // Example usage
  const longURL = 'https://www.example.com/some/very/long/url';
  const shortURL = urlShortener.shortenURL(longURL);
  
  console.log(`Short URL for ${longURL} is ${shortURL}`);
  console.log(`Original URL for ${shortURL} is ${urlShortener.getLongURL(shortURL)}`);