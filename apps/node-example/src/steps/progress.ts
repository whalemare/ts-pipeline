import { createStep } from '@ts-pipeline/core'

export const progress = createStep({
  name: 'progress',
  action: async (ui, maxTicks: number) => {
    return new Promise(resolve => {
      let ticks = 0

      const clear = setInterval(() => {
        if (ticks >= maxTicks) {
          clearInterval(clear)
          resolve(ticks)
        }
        ui.onProgress({ total: maxTicks, loaded: ticks++ })
      }, 100)
    })
  },
})
