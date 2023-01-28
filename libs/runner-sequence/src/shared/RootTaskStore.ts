import { TaskStore, TaskStoreProps, Registry } from '@ts-pipeline/task'

/**
 * Same as TaskStore, but can have nested tasks
 */
export class RootTaskStore<I = any, O = any> extends TaskStore<I, O> implements Registry<I, O> {
  run = async (input: I): Promise<O> => {
    return this.request.fetch(input)
  }

  cancel = () => {
    this.request.cancel()
    this.nested.forEach(it => it.request.cancel())
  }

  constructor(props: TaskStoreProps<I, O>, public nested: TaskStore[]) {
    super(props)
  }
}
