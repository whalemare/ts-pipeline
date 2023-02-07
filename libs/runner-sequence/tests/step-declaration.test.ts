import { declareStep } from '@ts-pipeline/core'

import { sequence } from '../src/shared/sequence'
import { setupStep } from '../src/shared/setup-step/setupStep'

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

  test('primitive data as input not supported', async () => {
    await sequence(
      noInputOutput,
      // @ts-ignore primitive data as input not supported
      setupStep(stringInput, 'data'),
    )
  })

  test('we can setup this step with complex data', async () => {
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
