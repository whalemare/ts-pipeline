import { createStep } from '@ts-pipeline/core'

import { sequence } from '../src/shared/sequence'
import { withPrev } from '../src/shared/with-prev/withPrev'

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

test('sequence', async () => {
  const withPrevFn = jest.fn()
  const runner = sequence(
    'sequence',
    stepSum,
    withPrev(prev => {
      withPrevFn(prev)
      return {
        name: 'a',
        action: async () => {
          return
        },
      }
    }),
  )

  await runner.run({ left: 0, right: 2 })

  expect(withPrevFn).toBeCalledWith(2)
})
