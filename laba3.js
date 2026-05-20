export function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      const item = cache.get(key);

      item.lastAccess = Date.now();
      item.freq++;

      cache.delete(key);
      cache.set(key, item);

      return item.value;
    }
    const result = fn.apply(this, args);

    cache.set(key, {
      value: result,
      createdAt: Date.now(),
      lastAccess: Date.now(),
      freq: 1,
    });

    return result;
  };
}
