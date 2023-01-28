// export declare type Func<TArgs extends any[], TOut> = (...args: TArgs) => TOut
import { declareStep } from '@ts-pipeline/core'

import { sequence } from '../src/shared/sequence'

describe('types', () => {
  const returnString = declareStep({
    name: 'returnString',
    action: async () => 'noArgStep',
  })

  const inputString = declareStep({
    name: 'inputString',
    action: async (ui, string: string) => `string = ${string}`,
  })

  const inputNumber = declareStep({
    name: 'inputNumber',
    action: async (ui, number: number) => `number = ${number}`,
  })

  test('allow no-string-string steps', () => {
    void sequence(
      //
      returnString,
      inputString,
    )
  })

  test('should types error when return-string to input-number', () => {
    void sequence(
      // @ts-expect-error
      returnString,
      inputNumber,
    )
  })

  test('action with no-input can receive any type as argument', () => {
    const inputVoidAction = jest.fn()
    const inputVoid = declareStep({
      name: 'input-void',
      action: async () => inputVoidAction(),
    })
    void sequence(
      //
      returnString,
      inputVoid,
    )
  })
})
