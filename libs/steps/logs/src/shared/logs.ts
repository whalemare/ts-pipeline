/* eslint-disable no-console */
import { createStep } from '@ts-pipeline/core'

export const logs = createStep({
  name: 'logs',
  historySize: 50,
  action: async ui => {
    console.log = new Proxy(console.log, {
      apply: (target, thisArg, argArray) => {
        ui.onData(argArray.join(' '))
      },
    })
    return new Promise(() => {
      // endless
    })
  },
})
