import { fibonacciGenerator, consumeWithTimeout } from 'lib';
const fib = fibonacciGenerator();
consumeWithTimeout(fib, 5);