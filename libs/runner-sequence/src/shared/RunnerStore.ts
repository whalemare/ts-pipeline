import { Step } from '@ts-pipeline/core'
import { ActionState, TaskStore } from '@ts-pipeline/task'
import { computed, observable, makeObservable } from 'mobx'

export interface RunnerStoreProps<I, O> {
  name: string
  steps: Step[]
  action: (ui: ActionState, tasks: TaskStore[], input: I) => Promise<O>
}

export class RunnerStore<I, O> {
  @computed
  get name(): string {
    return this.props.name
  }

  mainTask = new TaskStore<I, O>({
    name: this.name,
    action: async (ui, input) => {
      return this.props.action(ui, this.nested, input)
    },
  })

  @observable
  nested: TaskStore[] = []

  run = async (input: I): Promise<O> => {
    return this.mainTask.request.fetch(input)
  }

  constructor(private props: RunnerStoreProps<I, O>) {
    this.nested = this.props.steps.map(stepToTaskStore)

    makeObservable(this)
  }
}

const stepToTaskStore = <I, O>(step: Step<I, O>): TaskStore<I, O> => {
  return new TaskStore(step)
}
