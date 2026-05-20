export function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    if (cache.has(key)) {
      return cache.get(key).value;
    }

    const result = fn.apply(this, args);

    cache.set(key, {
    value: result,
    createdAt: Date.now(),
    lastAccess: Date.now(),
    freq: 1
});

    return result;
  };
}
