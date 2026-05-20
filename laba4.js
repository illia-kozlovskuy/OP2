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
peek(type = "highest") {
    if (this.items.length === 0) return null;

    let target = this.items[0];

    for (const item of this.items) {
        if (type === "oldest" && item.order < target.order) {
            target = item;
        }

        if (type === "newest" && item.order > target.order) {
            target = item;
        }
    }

    return target.value;
}
