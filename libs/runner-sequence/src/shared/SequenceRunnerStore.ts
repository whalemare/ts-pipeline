import { Step } from '@ts-pipeline/core'
import { QueueOutputable, Registry, TaskStore } from '@ts-pipeline/task'
import { isExist } from '@ts-pipeline/ts-core'
import { makeAutoObservable } from 'mobx'
import { RequestStore } from 'mobx-request'

export class SequenceRunnerStore implements Registry {
  private queue = new QueueOutputable<TaskStore>()

  tasks: TaskStore[] = []

  process = new RequestStore(async () => {
    let store = this.queue.dequeue()
    let prevResult: any = []

    while (isExist(store)) {
      prevResult = await store.request.fetch(prevResult)

      store = this.queue.dequeue()
    }

    return prevResult
  })

  constructor(steps: Step[]) {
    for (const step of steps) {
      const taskStore = new TaskStore(step)
      this.queue.push(taskStore)
      this.tasks.push(taskStore)
    }

    makeAutoObservable(this)
  }
}
