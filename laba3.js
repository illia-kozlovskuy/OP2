export function memoize(fn, options = {}) {
    const {
        maxSize = Infinity,
        ttl = null,
        customEvict = null
    } = options;

    const cache = new Map();

    function isExpired(item) {
        return ttl && (Date.now() - item.createdAt > ttl);
    }

    function evictLFU() {
        let minFreq = Infinity;
        let keyToDelete = null;

        for (const [key, value] of cache.entries()) {
            if (value.freq < minFreq) {
                minFreq = value.freq;
                keyToDelete = key;
            }
        }

        cache.delete(keyToDelete);
    }

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            const item = cache.get(key);

            if (isExpired(item)) {
                cache.delete(key);
            } else {
                item.freq++;
                item.lastAccess = Date.now();

                cache.delete(key);
                cache.set(key, item);

                return item.value;
            }
        }

        const result = fn.apply(this, args);

        cache.set(key, {
            value: result,
            createdAt: Date.now(),
            lastAccess: Date.now(),
            freq: 1
        });

        if (cache.size > maxSize) {
            if (customEvict) customEvict(cache);
            else evictLFU();
        }

        return result;
    };
}
const slowAdd = (a, b) => {
    console.log("calculating");
    return a + b;
};

const memoAdd = memoize(slowAdd);

console.log("1st call:", memoAdd(2, 3));
console.log("2nd call:", memoAdd(2, 3));
console.log("3rd call:", memoAdd(2, 3));