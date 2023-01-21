import { createStep } from '@ts-pipeline/ts-pipeline'

export const sum = createStep({
  name: 'sum',
  action: async (ui, a: number, b: number) => {
    return a + b
  },
})
