/* eslint-disable no-console */
import { declareStep } from '@ts-pipeline/core'
import { render } from '@ts-pipeline/renderer-react-ink'
import { parallel } from '@ts-pipeline/runner-parallel'
import { sequence, setupStep } from '@ts-pipeline/runner-sequence'

import { simulateWork } from './utils/simulateWork'
import { steps } from './utils/steps'

const deployPath = declareStep({
  name: 'deploy-path',
  action: async (ui, props: { artifactPath: string; registry: 'yarn' | 'npm' }) => {
    ui.onData(`deploying ${props.artifactPath}`)
    await simulateWork(200, ui)

    return props.artifactPath
  },
})

const build = declareStep({
  name: 'build',
  action: async (ui, props: { platform: 'android' | 'ios' | 'web' }) => {
    ui.onData(`start building for platform ${props.platform}`)
    await simulateWork(1000 * props.platform.length, ui)

    return {
      platform: props.platform,
      buildPath: `some/path/to/my/build/${props.platform}.zip`,
    }
  },
})

export async function complexApp() {
  const lint = steps.lint
  const tests = setupStep(steps.tests, { allowPercentage: 30 })

  await render(
    sequence(
      parallel(
        //
        lint,
        tests,
      ),

      parallel(
        setupStep(build, { platform: 'android' }),
        setupStep(build, { platform: 'ios' }),
        setupStep(build, { platform: 'web' }),
      ),
    ),
  )
}
