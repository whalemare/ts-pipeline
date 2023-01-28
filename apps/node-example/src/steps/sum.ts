import { createStep } from '@ts-pipeline/core'

interface SumProps {
  left: number
  right: number
}
export const sum = createStep({
  name: 'sum',
  action: async (ui, { left, right }: SumProps) => {
    return left + right
  },
})
