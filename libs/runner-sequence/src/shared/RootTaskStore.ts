import { TaskStore, TaskStoreProps, Registry, Step } from '@ts-pipeline/core'
import { makeObservable, observable } from 'mobx'

/**
 * Same as TaskStore, but can have nested tasks
 */
export class RootTaskStore<I = any, O = any> extends TaskStore<I, O> implements Registry<I, O> {
  @observable
  nested: TaskStore[] = []

  run = async (input: I): Promise<O> => {
    return this.request.fetch(input)
  }

  cancel = () => {
    this.request.cancel()
    this.nested.forEach(it => it.request.cancel())
  }

  constructor(getProps: (nested: TaskStore[]) => TaskStoreProps<I, O>, steps: Step[]) {
    const nested = steps.map(it => {
      if (it instanceof TaskStore) {
        return it
      } else {
        return new TaskStore(it)
      }
    })
    super(getProps(nested))

    this.nested = nested
    makeObservable(this)
  }
}
