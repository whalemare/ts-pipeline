/* eslint-disable @typescript-eslint/no-explicit-any */
import { TaskStore, Registry } from '@ts-pipeline/task'
import { observable, runInAction } from 'mobx'
import { RequestStore } from 'mobx-request'

interface PipelineRegistryStoreProps<R> {
  name: string
  fn: () => Promise<R>
}
export class PipelineRegistryStore implements Registry {
  process: RequestStore<void>

  tasks: TaskStore[] = observable.array<TaskStore>()

  add = (item: TaskStore) => {
    if (item instanceof TaskStore) {
      runInAction(() => {
        this.tasks.push(item)
      })
    }
  }

  constructor(private props: PipelineRegistryStoreProps<any>) {
    this.process = new RequestStore(props.fn, {
      onError: e => {
        console.error(e)
        this.tasks.forEach(task => {
          task.request.cancel()
        })
      },
    })
  }
}
