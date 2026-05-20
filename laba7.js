class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(event, listener) {
  if (!this.events[event]) {
    this.events[event] = [];
  }

  this.events[event].push(listener);

  return () => {
    this.events[event] = this.events[event].filter(l => l !== listener);
  };
}

  emit(event, data) {
    const listeners = this.events[event];

    if (!listeners) return;

    for (const listener of listeners) {
      listener(data);
    }
  }
}
const bus = new EventBus();

const unsubA = bus.subscribe("message", (data) => {
  console.log("A:", data);
});

bus.subscribe("message", (data) => {
  console.log("B:", data);
});

bus.emit("message", "Hello");