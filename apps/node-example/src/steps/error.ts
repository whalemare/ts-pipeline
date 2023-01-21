import { createStep } from '@ts-pipeline/ts-pipeline'

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
