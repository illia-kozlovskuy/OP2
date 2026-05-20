function createLogger(level = "INFO") {
  return function logDecorator(fn) {
    return function (...args) {
      const time = new Date().toISOString();

      console.log(`[${time}] [${level}] args:`, args);

      const result = fn(...args);

      console.log(`[${time}] [${level}] result:`, result);

      return result;
    };
  };
}