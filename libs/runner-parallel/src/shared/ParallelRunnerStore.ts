// import { Step } from '@ts-pipeline/core'
// import { ActionState, Registry, TaskStore } from '@ts-pipeline/core'
// import { computed, makeObservable, observable } from 'mobx'

// export class ParallelRunnerStore<I> implements Registry<I, I>, Step<I> {
//   @observable
//   nested: TaskStore<I>[] = []

//   @computed
//   get name() {
//     if (this.nested.length === 0) {
//       return 'parallel'
//     } else {
//       return `parallel(${this.nested.length})`
//     }
//   }

//   action = async (ui: ActionState, input: I) => {
//     await Promise.all(this.nested.map(async it => it.request.fetch(input)))

//     return input
//   }

//   mainTask = new TaskStore<I, I>({
//     name: this.name,
//     action: this.action,
//   })

//   run = async (input: I) => {
//     return this.mainTask.request.fetch(input)
//   }

//   constructor(steps: Step<I>[]) {
//     this.nested = steps.map(it => new TaskStore(it))

//     makeObservable(this)
//   }
// }
