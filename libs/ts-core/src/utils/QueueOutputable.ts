export class QueueOutputable<T> {
  private storage: T[] = []

  enqueue = (item: T): void => {
    if (this.size >= this.capacity) {
      this.dequeue()
    }

    this.storage.push(item)
  }

  push = (data: T): void => {
    this.enqueue(data)
  }

  dequeue(): T | undefined {
    return this.storage.shift()
  }

  get size(): number {
    return this.storage.length
  }

  get items() {
    return this.storage
  }

  constructor(private capacity: number = Infinity) {}
}
