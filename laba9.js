function log(level) {
  return function (fn) {
    return function (...args) {
      const time = new Date().toISOString();

      const result = fn(...args);

      console.log(`[${time}] [${level}] args:`, args);
      console.log(`[${time}] [${level}] result:`, result);

      return result;
    };
  };
}