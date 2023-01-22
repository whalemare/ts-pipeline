/* eslint-disable @typescript-eslint/no-explicit-any */
import { TaskStore, Registry } from '@ts-pipeline/task'
import { makeObservable, observable, runInAction } from 'mobx'

interface PipelineRegistryStoreProps<R> {
  name: string
  fn: () => Promise<R>
}
export class PipelineRegistryStore implements Registry {
  @observable
  workflowTask: TaskStore

  tasks: TaskStore[] = observable.array<TaskStore>()

  add = (item: TaskStore) => {
    if (item instanceof TaskStore) {
      runInAction(() => {
        this.tasks.push(item)
      })
    }
  }

  constructor(private props: PipelineRegistryStoreProps<any>) {
    makeObservable(this)

    this.workflowTask = new TaskStore({
      name: props.name,
      action: props.fn,
      historySize: Infinity,
    })
  }
}
