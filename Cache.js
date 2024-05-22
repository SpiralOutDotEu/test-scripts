class Cache {
    constructor() {
        this.store = new Map();
        this.expiry = new Map();
    }

    _cleanup() {
        const currentTime = Date.now();
        for (const [key, expireTime] of this.expiry.entries()){
            if(expireTime <= currentTime){
                this.store.delete(key);
                this.expiry.delete(key);
            }
        }
    }

    set(key, value, ttl){
        const expireTime = Date.now() +ttl*1000;
        this.store.set(key, value);
        this.expiry.set(key, expireTime);
    }

    get(key){
        this._cleanup();
        if(!this.store.has(key)){
            return null;
        }
        if(this.expiry.get(key) <= Date.now()){
            this.store.delete(key);
            this.expiry.delete(key);
            return null;
        }
        return this.store.get(key)
    }
}

// Example usage:
const cache = new Cache();
cache.set('foo', 'bar', 5); // Key 'foo' with value 'bar' and TTL of 5 seconds

setTimeout(() => {
  console.log(cache.get('foo')); // Output: 'bar'
}, 3000);

setTimeout(() => {
  console.log(cache.get('foo')); // Output: null (since it has expired)
}, 6000);