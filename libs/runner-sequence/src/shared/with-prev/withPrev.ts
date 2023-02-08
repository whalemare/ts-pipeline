import { createStep, Step } from '@ts-pipeline/core'

/**
 * Allow to use previous step output as some kind of "setup" for next step
 * @returns
 */
export const withPrev = <PO, O>(stepGenerator: (prev: PO) => Step<void, O>) => {
  return createStep<PO, O>({
    name: 'withPrev(?)',
    action: async (ui, prevOutput) => {
      const step = stepGenerator(prevOutput)
      if (step.name) {
        ui.setName(step.name)
      }

      return step.action(ui, void 0)
    },
  })
}
