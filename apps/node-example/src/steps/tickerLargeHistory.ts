import { createStep } from '@ts-pipeline/core'

export const tickerLargeHistory = createStep({
  name: 'ticker-large-history',
  historySize: 10,
  action: async (ui, ms: number) => {
    let ticks = 0

    setInterval(() => {
      ui.onData(ticks++)
    }, Number(ms))

    return new Promise(() => {
      // infinite
    })
  },
})
