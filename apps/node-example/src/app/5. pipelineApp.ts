/* eslint-disable no-console */
import { sequence, setupStep } from '@ts-pipeline/runner-sequence'

import { steps } from './utils/steps'

export async function pipelineApp() {
  console.warn(
    'WARN! This example no render anything, just display result of raw sequence run. Explore code for details',
  )

  const { promise } = sequence(
    steps.lint,
    steps.build,
    setupStep(steps.deploy, { registry: 'yarn' }),
  )
  const result = await promise

  console.log(`result "${result}"`)
}
