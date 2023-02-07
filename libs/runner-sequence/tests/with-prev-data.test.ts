import { sequence } from '../src/shared/sequence'
import { withData } from '../src/shared/with-data/withData'
import { withPrevData } from '../src/shared/with-prev-data/withPrevData'
import { withPrev } from '../src/shared/with-prev/withPrev'

import { testSteps } from './testSteps.test'

test('with-prev-data', async () => {
  const runner = sequence(
    'sequence',
    testSteps.sum,
    withPrevData(testSteps.sum, prevSum => ({
      left: prevSum,
      right: 1000,
    })),
    withPrevData(testSteps.generateNumber, () => ({})),
    withPrevData(testSteps.generateString, () => ({})),
  )

  const result = await runner.run({ left: 0, right: 2 })

  expect(typeof result).toStrictEqual('string')
})

test('with-prev-data unwrapper', async () => {
  const runner = sequence(
    'sequence',
    testSteps.sum,
    withPrev(prev => {
      return withData(testSteps.sum, { left: 1000, right: prev })
    }),
  )

  const result = await runner.run({ left: 0, right: 2 })

  expect(result).toBe(1002)
})
