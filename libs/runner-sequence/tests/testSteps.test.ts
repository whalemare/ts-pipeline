import { createStep } from '@ts-pipeline/core'

interface SumProps {
  left: number
  right: number
}

export const testSteps = {
  sum: createStep({
    name: 'sum',
    action: async (state, props: SumProps) => {
      return props.left + props.right
    },
  }),
  generateString: createStep({
    name: 'generateString',
    action: async () => {
      return Date.toString()
    },
  }),
  generateNumber: createStep({
    name: 'generateNumber',
    action: async () => {
      return Date.now()
    },
  }),
}
