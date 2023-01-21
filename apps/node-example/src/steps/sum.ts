import { createStep } from '@ts-pipeline/core'

export const sum = createStep({
  name: 'sum',
  action: async (ui, a: number, b: number) => {
    return a + b
  },
})
