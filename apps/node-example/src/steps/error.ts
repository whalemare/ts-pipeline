import { createStep } from '@ts-pipeline/core'

export const error = createStep({
  name: 'error',
  action: async (ui, ms: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('ooops!'))
      }, ms)
    })
  },
})
