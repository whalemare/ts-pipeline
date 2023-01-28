/* eslint-disable @typescript-eslint/no-explicit-any */
import { TaskStore, Registry } from '@ts-pipeline/task'
import { observable, runInAction } from 'mobx'
import { RequestStore } from 'mobx-request'

interface PipelineRegistryStoreProps<R> {
  name: string
  fn: () => Promise<R>
}

/**
 * @deprecate use SequenceRegistryStore
 */
export class PipelineRegistryStore implements Registry {
  // @ts-ignore
  request: RequestStore<void>

  tasks: TaskStore[] = observable.array<TaskStore>()

  add = (item: TaskStore) => {
    if (item instanceof TaskStore) {
      runInAction(() => {
        this.tasks.push(item)
      })
    }
  }

  constructor(props: PipelineRegistryStoreProps<any>) {
    this.request = new RequestStore(props.fn, {
      onError: e => {
        console.error(e)
        this.tasks.forEach(task => {
          task.request.cancel()
        })
      },
    })
  }
}
