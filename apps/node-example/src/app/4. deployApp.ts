/* eslint-disable no-console */
import { sequence, setupStep } from '@ts-pipeline/runner-sequence'

import { steps } from './utils/steps'

export async function deployApp() {
  console.warn(
    'WARN! This example no render anything, just display result of raw sequence run. Explore code for details',
  )

  const { registry } = sequence(
    steps.lint,
    steps.build,
    setupStep(steps.deploy, { registry: 'yarn' }),
  )
  // TODO: improve typings for allow pass nothing
  const result = await registry.request.fetch([{}])

  console.log(`result "${result}"`)
}
