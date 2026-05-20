function* fibonacciGenerator() {
    let a = 0, b = 1;

    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}
function consumeWithTimeout(iterator, seconds) {
    const start = Date.now();

    const interval = setInterval(() => {

        if (Date.now() - start >= seconds * 1000) {
            clearInterval(interval);
            return;
        }

        const value = iterator.next().value;
        console.log(value);

    }, 500);
}
const fib = fibonacciGenerator();
consumeWithTimeout(fib, 5);