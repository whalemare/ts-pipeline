import { Step } from '@ts-pipeline/core'
import { RootTaskStore } from '@ts-pipeline/runner-sequence'

export const parallel = <I>(initial: Step<I>, ...steps: Step<I>[]) => {
  return new RootTaskStore<I, void>(
    nested => ({
      name: 'parallel',
      action: async (ui, input) => {
        await Promise.all(nested.map(async it => it.request.fetch(input)))

        // return input
      },
    }),
    [initial, ...steps],
  )
}
