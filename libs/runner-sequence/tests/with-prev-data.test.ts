import { sequence } from '../src/shared/sequence'
import { withPrev } from '../src/shared/with-prev/withPrev'

import { testSteps } from './testSteps.test'

test('with-prev-data', async () => {
  const runner = sequence(
    'sequence',
    testSteps.sum,
    withPrev(testSteps.sum, prevSum => ({
      left: prevSum,
      right: 1000,
    })),
    withPrev(testSteps.generateNumber, () => ({})),
    withPrev(testSteps.generateString, () => ({})),
  )

  const result = await runner.run({ left: 0, right: 2 })

  expect(typeof result).toStrictEqual('string')
})
