import { Step } from '@ts-pipeline/core'
import { RootTaskStore } from '@ts-pipeline/runner-sequence'
import { TaskStore } from '@ts-pipeline/task'

export const parallel = <I>(initial: Step<I>, ...steps: Step<I>[]) => {
  const tasks = [initial, ...steps].map(it => new TaskStore(it))

  return new RootTaskStore(
    {
      name: 'parallel',
      action: async (ui, input) => {
        await Promise.all(steps.map(async it => it.action(ui, input)))

        return input
      },
    },
    tasks,
  )
}
