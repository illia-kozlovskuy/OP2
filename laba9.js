function log(level) {
  return function (fn) {
    return async function (...args) {
      const time = new Date().toISOString();
      try {
        const result = await fn(...args);
        if (level === "Error") {
          console.log(`[${time}] [${level}] args:`, args);
          console.log(`[${time}] [${level}] result:`, result);
        }
        return result;
      } catch (err) {
        if (level === "Error") {
          console.log(`[${time}] [Error] args:`, args);
          console.log(`[${time}] [Error] error:`, err.message);
        }
        throw err;
      }
    };
  };
}
const add = log ("Info")(async (a, b) => {
    return a + b;
});
add(5, 7).then(res =>console.log(res));