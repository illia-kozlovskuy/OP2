async function* largeDataGenerator(size = 10) {
  for (let i = 0; i < size; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));
    yield i;
  }
}
async function processLargeData(stream, processor) {
  const result = [];
try {
    for await (const item of stream) {
      result.push(await processor(item));
    }
  } catch (err) {
    throw err;
  }

  return result;
}
async function example() {
  const stream = largeDataGenerator(10);

  const result = await processLargeData(stream, async (x) => {
    return x * 2;
  });

  console.log("RESULT:", result);
}

example();