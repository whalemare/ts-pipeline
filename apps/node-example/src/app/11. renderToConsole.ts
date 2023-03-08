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

const build = createStep({
  name: 'build',
  action: async (ui, props: { platform: 'android' | 'ios' | 'web' }) => {
    ui.onData(`start building for platform ${props.platform}`)
    await simulateWork(10000 * props.platform.length, ui)

    return {
      platform: props.platform,
      buildPath: `some/path/to/my/build/${props.platform}.zip`,
    }
  },
})

const upload = createStep({
  name: 'upload',
  action: async (ui, props: { buildPath: string; retryCount?: number }) => {
    ui.onData(`uploading ${props.buildPath}`)
    await simulateWork(1000 * props.buildPath.length, ui)

    return {
      url: `https://my-build-server.com/${props.buildPath}`,
    }
  },
})

export async function renderToConsoleApp() {
  const lint = steps.lint
  const tests = setupStep(steps.tests, { allowPercentage: 30 })

  await renderToConsole(
    sequence(
      'deploy react-native application',

      parallel('lint and tests', lint, tests),

      parallel(
        'build for all platforms',

        sequence(
          'build and upload android app to server <3',
          setupStep(build, { platform: 'android' }),
          // android can hangup sometimes, so we retry 10 times
          setupStep(upload, { retryCount: 10 }),
        ),

        sequence(
          'build and upload ios to server <3',
          setupStep(build, { platform: 'ios' }),
          upload,
        ),

        sequence(
          'build and upload web to server <3',
          setupStep(build, { platform: 'web' }),
          upload,
        ),
      ),
    ),
  )
}
