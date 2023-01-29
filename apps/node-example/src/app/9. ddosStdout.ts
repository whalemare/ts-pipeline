/* eslint-disable no-console */
import { createStep } from '@ts-pipeline/core'
import { render } from '@ts-pipeline/renderer-react-ink'
import { parallel } from '@ts-pipeline/runner-parallel'
import { setupStep } from '@ts-pipeline/runner-sequence'

import { steps } from './utils/steps'

let instance = 0

const ddos = createStep({
  name: 'ddos',
  formatArgs: args => {
    return { instance: instance++ }
  },
  action: async (ui, { interval = 100 }: { interval?: number } = {}) => {
    let iteration = 0
    setInterval(() => {
      ui.onData(`start ddos ${iteration++}`)
    }, interval)

    return new Promise(() => {
      //
    })
  },
})

export async function ddosStdout() {
  const lint = steps.lint
  const tests = setupStep(steps.tests, { allowPercentage: 30 })

  await render(
    parallel(
      'ddos stdout',
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
      ddos,
    ),

    // pass reverse flag to remove flickering
    { reverse: true },
  )
}
