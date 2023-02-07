import { createStep } from '@ts-pipeline/core'

import { sequence } from '../src/shared/sequence'
import { withData } from '../src/shared/with-data/withData'

interface SumProps {
  left: number
  right: number
}

const stepSum = createStep({
  name: 'sum',
  action: async (state, props: SumProps) => {
    return props.left + props.right
  },
})

test('with-data', async () => {
  // `withData` ignore result from previous step
  // and just make step to be without arguments
  const sumOfZero = withData(stepSum, { left: 0, right: 0 })

  const runner = sequence(
    'sequence',
    {
      name: 'number generator',
      action: async () => {
        return Date.now()
      },
    },
    sumOfZero,
  )

  const result = await runner.run({ left: 0, right: 999 })

  expect(result).toBe(0)
})
