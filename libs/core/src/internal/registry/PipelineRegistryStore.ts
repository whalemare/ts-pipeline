import { TaskStore } from '@ts-pipeline/task'
import { makeObservable, observable, runInAction } from 'mobx'

interface PipelineRegistryStoreProps<R> {
  name: string
  fn: () => Promise<R>
}
export class PipelineRegistryStore {
  @observable
  workflowTask: TaskStore

  tasks: TaskStore[] = observable.array<TaskStore>()

  add = (item: TaskStore) => {
    console.log('add task', item.name)
    if (item instanceof TaskStore) {
      runInAction(() => {
        this.tasks.push(item)
        console.log('this.tasks.length', this.tasks.length)
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
