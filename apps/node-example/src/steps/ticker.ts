import { createStep } from '@ts-pipeline/core'

export const ticker = createStep({
  name: 'ticker',
  historySize: 1,
  action: async (ui, ms: number) => {
    let ticks = 0

    console.log('this inside ticked', this)

    setInterval(() => {
      ui.onData(ticks++)
    }, Number(ms))

    return new Promise(() => {
      // infinite
    })
  },
})
