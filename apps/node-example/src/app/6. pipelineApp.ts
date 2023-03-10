/* eslint-disable no-console */
import { createStep } from '@ts-pipeline/core'
import { render } from '@ts-pipeline/renderer-react-ink'
import { sequence, setupStep } from '@ts-pipeline/runner-sequence'

import { simulateWork } from './utils/simulateWork'
import { steps } from './utils/steps'

const deployPath = createStep({
  name: 'deploy-path',
  action: async (ui, props: { artifactPath: string; registry: 'yarn' | 'npm' }) => {
    ui.onData(`deploying ${props.artifactPath}`)
    await simulateWork(200, ui)

    return props.artifactPath
  },
})

export async function pipelineApp() {
  await render(
    sequence(
      'pipeline',
      // create sequence of steps
      steps.lint,
      steps.build,
      setupStep(deployPath, { registry: 'yarn' }),
    ),
  )
}
