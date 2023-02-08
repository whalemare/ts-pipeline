import { createStep, Step } from '@ts-pipeline/core'

import { StepInput } from '../type/StepInput'
import { StepOutput } from '../type/StepOutput'

/**
 * Allow to use previous step output as some kind of "setup" for next step
 */
export const withPrev = <S extends Step, PO>(
  step: S,
  createInput: (prevOutput: PO) => StepInput<S>,
) => {
  return createStep<PO, StepOutput<S>>({
    name: step.name,
    action: async (ui, prevOutput) => {
      const input = createInput(prevOutput)
      return step.action(ui, input)
    },
  })
}
