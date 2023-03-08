/* eslint-disable no-console */
import { createStep } from '@ts-pipeline/core'
import { renderToConsole } from '@ts-pipeline/renderer-core'
import { parallel } from '@ts-pipeline/runner-parallel'
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

export async function parallelApp() {
  await renderToConsole(
    sequence(
      'parallel app',
      // create sequence of steps
      steps.lint,
      steps.build,
      parallel(
        'deploy to npm and yarn',
        setupStep(deployPath, { registry: 'yarn' }),
        setupStep(deployPath, { registry: 'npm' }),
      ),
    ),
  )
}
