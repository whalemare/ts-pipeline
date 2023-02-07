import { createStep, Step } from '@ts-pipeline/core'

import { StepInput } from '../type/StepInput'
import { StepOutput } from '../type/StepOutput'

/**
 * Decorator function that prefill step with some arguments, make it to be new step without arguments
 */
export const withData = <S extends Step>(step: S, input: StepInput<S>) => {
  // we don
  return createStep<unknown, StepOutput<S>>({
    name: step.name,
    action: async ui => {
      return step.action(ui, input)
    },
  })
}
