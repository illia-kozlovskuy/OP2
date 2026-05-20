export class BiPriorityQueue {
  constructor() {
    this.items = [];
    this.counter = 0;
  }

  enqueue(value, priority) {
    this.items.push({
        value,
        priority,
        order: this.counter++
    });
}

  peek(type = "highest") {}
  dequeue(type = "highest") {}
}
