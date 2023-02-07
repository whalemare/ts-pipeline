import { createStep, makeStepExecutable } from '@ts-pipeline/core'
import { pipe } from 'fp-ts/lib/function'

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

test('pipe', () => {
  const executable = makeStepExecutable(stepSum)
  pipe(stepSum)
})
