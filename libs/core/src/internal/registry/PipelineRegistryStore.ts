import { makeObservable, observable, runInAction } from 'mobx'

import { TaskStore } from '../task/TaskStore'

export class PipelineRegistryStore {
  @observable
  tasks: TaskStore[] = []

  add = (item: TaskStore) => {
    if (item instanceof TaskStore) {
      runInAction(() => {
        this.tasks.push(item)
      })
    }
  }

  constructor(private name: string) {
    makeObservable(this)
  }
}
