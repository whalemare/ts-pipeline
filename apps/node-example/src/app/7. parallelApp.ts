/* eslint-disable no-console */
import { declareStep } from '@ts-pipeline/core'

import { simulateWork } from './utils/simulateWork'

const deployPath = declareStep({
  name: 'deploy-path',
  action: async (ui, props: { artifactPath: string; registry: 'yarn' | 'npm' }) => {
    ui.onData(`deploying ${props.artifactPath}`)
    await simulateWork(200, ui)

    return props.artifactPath
  },
})

export async function parallelApp() {
  // await render(
  //   sequence(
  //     // create sequence of steps
  //     steps.lint,
  //     steps.build,
  //     parallel(
  //       setupStep(deployPath, { registry: 'yarn' }),
  //       setupStep(deployPath, { registry: 'npm' }),
  //     ),
  //   ),
  // )
}
