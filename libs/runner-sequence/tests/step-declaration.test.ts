import { declareStep, Step } from '@ts-pipeline/core'

import { sequence } from '../src/shared/sequence'

export type StepDeclaration<I = any, O = any, S extends Partial<I> = I> = Step<I, O> & {
  setup?: (props: S) => I

  (props: S): Step<I, O>
}

describe('step-declaration', () => {
  const noInputOutput = declareStep({
    name: 'no-input-output',
    action: async () => {
      // do something
    },
  })

  const stringInput = declareStep({
    name: 'string-input',
    action: async (_, string: string) => {
      string
    },
  })

  test('should ts error when next-input want something that doesn`t exists from previous step', async () => {
    await sequence(
      // @ts-expect-error unable to run stringInput, because it require 'string' as argument, but 'noInputOutput' returns void
      noInputOutput,
      stringInput,
    )
  })

  type InferStepInput<S> = S extends Step<infer I> ? I : never
  type InferStepOutput<S> = S extends Step<infer I, infer O> ? O : never

  type ExcludeArgsFromStep<OriginalArgs, SetupArgs> = Omit<OriginalArgs, keyof SetupArgs>

  const setupStep = <
    S extends Step = Step,
    StepInput extends InferStepInput<S> = InferStepInput<S>,
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

  test('we can setup that step with some primitive data', async () => {
    await sequence(
      noInputOutput,
      // can use stringInput because it prefilled with 'data'
      setupStep(stringInput, 'data'),
    )
  })

  test('we can setup this step with complex data', async () => {
    interface ComplexProps {
      size: number
      command: string
    }
    const complexPropsInput = declareStep({
      name: 'complex-props',
      action: async (ui, props: ComplexProps) => {
        //
      },
    })

    await sequence(
      noInputOutput,
      setupStep(complexPropsInput, {
        command: 'command from setup',
        size: 1,
      }),
    )
  })

  test('we can setup this step with partial complex data, but previous should warn', async () => {
    interface ComplexProps {
      size: number
      command: string
    }
    const complexPropsInput = declareStep<ComplexProps>({
      name: 'complex-props',
      action: async () => {
        //
      },
    })

    const setupped = setupStep(complexPropsInput, {
      command: 'command from setup',
    })
    await sequence(
      // @ts-expect-error should return 'size' that not filled in setupStep
      noInputOutput,
      setupped,
    )

    const returnSizeStep = declareStep({
      name: 'return-size',
      action: async () => {
        return {
          size: 4,
        }
      },
    })

    await sequence(
      // no error, because `returnSizeStep` return 'size' and  'setupStep' prefilled with 'command'
      returnSizeStep,
      setupStep(complexPropsInput, {
        command: 'command from setup',
      }),
    )
  })
})
