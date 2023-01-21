import { makeObservable, observable } from 'mobx'

import { TaskStore } from '../task/TaskStore'

export class PipelineRegistryStore {
  @observable
  tasks: TaskStore[] = []

  add = (item: TaskStore) => {
    if (item instanceof TaskStore) {
      this.tasks.push(item)
    }
  }

  constructor(private name: string) {
    makeObservable(this)
  }
}
