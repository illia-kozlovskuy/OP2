export class BiPriorityQueue {
  constructor() {
    this.items = [];
    this.counter = 0;
  }

  enqueue(value, priority) {
    this.items.push({
      value,
      priority,
      order: this.counter++,
    });
  }
  peek(type = "highest") {
    if (this.items.length === 0) return null;

    let target = this.items[0];

    for (const item of this.items) {
      if (type === "highest" && item.priority > target.priority) {
        target = item;
      }

      if (type === "lowest" && item.priority < target.priority) {
        target = item;
      }

      if (type === "oldest" && item.order < target.order) {
        target = item;
      }

      if (type === "newest" && item.order > target.order) {
        target = item;
      }
    }

    return target.value;
  }
  dequeue(type = "highest") {
    if (this.items.length === 0) return null;

    let index = 0;

    for (let i = 1; i < this.items.length; i++) {
      const a = this.items[i];
      const b = this.items[index];

      if (type === "highest" && a.priority > b.priority) index = i;
      if (type === "lowest" && a.priority < b.priority) index = i;
      if (type === "oldest" && a.order < b.order) index = i;
      if (type === "newest" && a.order > b.order) index = i;
    }

    const [removed] = this.items.splice(index, 1);
    return removed.value;
  }
}
