import { createStep, makeStepExecutable } from '@ts-pipeline/core'

/**
 * Never resolve or reject, just counting
 */
export const ticker = makeStepExecutable(
  createStep({
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
  }),
)
