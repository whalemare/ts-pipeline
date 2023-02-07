import { action, computed, makeObservable, observable } from 'mobx'

export class QueueOutputable<T> {
  @observable
  private storage: T[] = []

  @action
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

  @computed
  get items() {
    return this.storage
  }

  constructor(private capacity: number = Infinity) {
    makeObservable(this)
  }
}
