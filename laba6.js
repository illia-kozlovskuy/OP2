async function* largeDataGenerator(size = 10) {
  for (let i = 0; i < size; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));
    yield i;
  }
}
async function processLargeData(stream, processor) {
  const result = [];

  for await (const item of stream) {
    result.push(await processor(item));
  }

  return result;
}