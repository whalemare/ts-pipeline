// export declare type Func<TArgs extends any[], TOut> = (...args: TArgs) => TOut
import { declareStep } from '@ts-pipeline/core'

import { sequence } from '../src/shared/sequence'

describe('sequence', () => {
  const inputStringAction = jest.fn()

  const returnString = declareStep({
    name: 'returnString',
    action: async () => 'noArgStep',
  })

  test('second step called with first step result', async () => {
    const inputString = declareStep({
      name: 'inputString',
      action: async (ui, string: string) => inputStringAction(string),
    })

    await sequence(
      //
      returnString,
      inputString,
    )

    expect(inputStringAction).toBeCalledWith('noArgStep')
  })

  test('third step called with second step result', async () => {
    const second = declareStep({
      name: 'second',
      action: async () => 'second',
    })

    const thirdAction = jest.fn()
    const third = declareStep({
      name: 'third',
      action: async (ui, input: string) => thirdAction(input),
    })

    await sequence(
      //
      returnString,
      second,
      third,
    )

    expect(thirdAction).toBeCalledWith('second')
  })
})
