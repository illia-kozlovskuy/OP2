function mapSync(array, fn) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    result.push(fn(array[i], i));
  }

  return result;
}

function mapCallback(array, fn, cb) {
  let i = 0;
  const result = [];

  function next() {
    if (i >= array.length) {
      return cb(null, result);
    }

    setTimeout(() => {
      try {
        result.push(fn(array[i], i));
        i++;
        next();
      } catch (err) {
        cb(err, null);
      }
    }, 100);
  }

  next();
}

function mapPromise(array, fn) {
  return new Promise((resolve, reject) => {
    let i = 0;
    const result = [];

    function next() {
      if (i >= array.length) {
        return resolve(result);
      }

      setTimeout(() => {
        try {
          result.push(fn(array[i], i));
          i++;
          next();
        } catch (err) {
          reject(err);
        }
      }, 100);
    }

    next();
  });
}

function mapAbortable(array, fn) {
  const controller = new AbortController();
  const signal = controller.signal;

  const promise = new Promise((resolve, reject) => {
    let i = 0;
    const result = [];

    function next() {
      if (signal.aborted) {
        return reject(new Error("AbortError"));
      }

      if (i >= array.length) {
        return resolve(result);
      }

      setTimeout(() => {
        try {
          result.push(fn(array[i], i));
          i++;
          next();
        } catch (err) {
          reject(err);
        }
      }, 100);
    }

    signal.addEventListener("abort", () => {
      reject(new Error("AbortError"));
    });

    next();
  });

  return { promise, controller };
}

const arr = [1, 2, 3, 4];

console.log("SYNC:", mapSync(arr, x => x * 2));

mapCallback(arr, (x) => x * 2, (err, res) => {
  console.log("CALLBACK:", res);
});

mapPromise(arr, (x) => x * 2)
  .then(res => console.log("PROMISE:", res));

const { promise, controller } = mapAbortable(arr, (x) => x * 2);

promise
  .then(res => console.log("ABORTABLE:", res))
  .catch(err => console.log("ABORTED:", err.message));

setTimeout(() => {
  controller.abort();
}, 200);