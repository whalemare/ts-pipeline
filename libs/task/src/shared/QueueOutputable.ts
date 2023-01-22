import { action, computed, makeObservable, observable } from 'mobx'

import { History } from './entity/History'

export class QueueOutputable<T extends string = string> implements History {
  @observable
  private storage: T[] = []

  @action
  enqueue = (item: T): void => {
    if (this.size >= this.capacity) {
      this.dequeue()
    }

    this.storage.push(item)
  }

  push = (data: string): void => {
    this.enqueue(data as T)
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
