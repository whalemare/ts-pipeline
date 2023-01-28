/* eslint-disable no-console */
import { sequence, setupStep } from '@ts-pipeline/runner-sequence'

import { steps } from './utils/steps'

const pipeline = (...steps: any[]) => {}

export async function pipelineApp() {
  pipeline(
    // we can put sequence to pipeline
    sequence(
      // with some steps
      steps.lint,
      steps.build,
      setupStep(steps.deploy, { registry: 'yarn' }),
    ),
  )
}
