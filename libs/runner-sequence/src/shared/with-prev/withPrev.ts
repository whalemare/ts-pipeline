import { createStep, Step } from '@ts-pipeline/core'

/**
 * Allow to use previous step output as some kind of "setup" for next step
 * @returns
 */
export const withPrev = <PO, O>(stepGenerator: (prev: PO) => Step<void, O>) => {
  return createStep<PO, O>({
    name: 'withPrev', // TODO
    action: async (ui, prevOutput) => {
      const step = stepGenerator(prevOutput)

      return step.action(ui, void 0)
    },
  })
}
