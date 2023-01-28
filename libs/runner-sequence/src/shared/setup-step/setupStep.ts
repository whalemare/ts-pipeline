import { declareStep, Step } from '@ts-pipeline/core'

import { ExcludeArgsFromStep } from './ExcludeArgsFromStep'

type InferStepInput<S> = S extends Step<infer I> ? I : never
type InferStepOutput<S> = S extends Step<infer I, infer O> ? O : never

/**
 * Allow to prefill `step` with some arguments, when previous step is not returned required arguments
 *
 * Merge strategy is: { ...setup, ...input }, so input arguments most wanted
 */
export const setupStep = <
  S extends Step = Step,
  StepInput extends object = InferStepInput<S>,
  StepOutput extends InferStepOutput<S> = InferStepOutput<S>,
  SetupInput extends Partial<StepInput> = Partial<StepInput>,
  NewInput = ExcludeArgsFromStep<StepInput, SetupInput>,
>(
  step: S,
  setupArgs: SetupInput,
) => {
  return declareStep<NewInput, StepOutput>({
    name: step.name,
    action: async (ui, input) => {
      return step.action(ui, { ...setupArgs, ...input })
    },
  })
}
