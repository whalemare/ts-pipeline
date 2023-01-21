import { createStep } from '@ts-pipeline/ts-pipeline'

export const ticker = createStep({
  name: 'ticker',
  historySize: 1,
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
