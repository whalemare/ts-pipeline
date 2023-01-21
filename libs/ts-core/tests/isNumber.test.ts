import { validators } from '../src/validators/validators'

interface Case {
  value: any
  isNumber: boolean
}

describe('isNumber', () => {
  const cases: Case[] = [
    { value: '1', isNumber: true },
    { value: '-1', isNumber: true },
    { value: '1.0', isNumber: true },
    { value: '1995', isNumber: true },
    { value: '199u', isNumber: false },
    { value: '199u', isNumber: false },
    { value: 0, isNumber: true },
    { value: 1, isNumber: true },
    { value: 1234567890, isNumber: true },
    { value: '1234567890', isNumber: true },
    { value: '0', isNumber: true },
    { value: '1', isNumber: true },
    { value: '1.1', isNumber: true },
    { value: '-1', isNumber: true },
    { value: '-1.2354', isNumber: true },
    { value: '-1234567890', isNumber: true },
    { value: -1, isNumber: true },
    { value: -32.1, isNumber: true },
    { value: '0x1', isNumber: true },
    { value: true, isNumber: false },
    { value: false, isNumber: false },
    { value: '1..1', isNumber: false },
    { value: '1,1', isNumber: false },
    { value: '-32.1.12', isNumber: false },
    { value: '[blank]', isNumber: false },
    { value: '[spaces]', isNumber: false },
    { value: 'null', isNumber: false },
    { value: 'undefined', isNumber: false },
    { value: [], isNumber: false },
    { value: 'NaN', isNumber: false },
  ]

  cases.forEach(c => {
    test(`${c.value} is number: ${c.isNumber}`, () => {
      const error = validators.isNumber('error-not-number')(c.value)

      if (c.isNumber) {
        expect(error).toBeUndefined()
      } else {
        expect(error).toBeDefined()
      }
    })
  })
})
