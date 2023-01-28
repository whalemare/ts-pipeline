/* eslint-disable no-console */
import { sequence, setupStep } from '@ts-pipeline/runner-sequence'

import { steps } from './utils/steps'

export async function deployApp() {
  console.warn(
    'WARN! This example no render anything, just display result of raw sequence run. Explore code for details',
  )

  const runnable = sequence(
    'deploy app',
    steps.lint,
    steps.build,
    setupStep(steps.deploy, { registry: 'yarn' }),
  )
  // TODO: improve typings for allow pass nothing
  const result = await runnable.run(void 0)
  console.log(`result "${result}"`)
}
