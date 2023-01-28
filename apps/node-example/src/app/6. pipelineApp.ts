/* eslint-disable no-console */
import { declareStep } from '@ts-pipeline/core'
import { ReactInkRender } from '@ts-pipeline/renderer-react-ink'
import { sequence, setupStep } from '@ts-pipeline/runner-sequence'
import { Registry } from '@ts-pipeline/task'

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

export async function pipelineApp() {
  await pipeline(
    sequence(
      // create sequence of steps
      // steps.lint,
      steps.build,
      setupStep(deployPath, { registry: 'yarn' }),
    ),
  )
}

const pipeline = async (runnable: Registry<void, unknown>) => {
  // render registry emited by sequence
  new ReactInkRender().render(runnable)

  // run sequence
  await runnable.run()

  // exit when finished
  process.exit(0)
}
