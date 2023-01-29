import { Step } from '@ts-pipeline/core'
import { RootTaskStore } from '@ts-pipeline/runner-sequence'

// TODO: add infer output type
export const parallel = <I, O extends any[] = any>(name = 'parallel', ...steps: Step<I>[]) => {
  return new RootTaskStore<I, I>(
    nested => ({
      name: name,
      action: async (ui, input) => {
        const results = await Promise.all(nested.map(async it => it.request.fetch(input)))

        return input
      },
    }),
    steps,
  )
}
