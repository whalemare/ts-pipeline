// import { Step } from '@ts-pipeline/core'
// import { Registry, TaskStore } from '@ts-pipeline/core'
// import { computed, makeObservable, observable } from 'mobx'

// export class SequenceRunnerStore<I = any, O = any> implements Registry<I, O> {
//   @computed
//   get name(): string {
//     return `sequence`
//   }

//   mainTask = new TaskStore<I, O>({
//     name: this.name,
//     action: async (ui, input): Promise<O> => {
//       let prevResult = input

//       // TODO: ui.onProgress can track here
//       for (const task of this.nested) {
//         prevResult = await task.request.fetch(prevResult)
//       }

//       return prevResult as unknown as O
//     },
//   })

//   @observable
//   nested: TaskStore[] = []

//   run = async (input: I): Promise<O> => {
//     return this.mainTask.request.fetch(input)
//   }

//   constructor(steps: Step[]) {
//     this.nested = steps.map(stepToTaskStore)

//     makeObservable(this)
//   }
// }

// const stepToTaskStore = <I, O>(step: Step<I, O>): TaskStore<I, O> => {
//   return new TaskStore(step)
// }
