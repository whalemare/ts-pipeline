/* eslint-disable no-console */
import { declareStep } from '@ts-pipeline/core'
import { sequence, setupStep } from '@ts-pipeline/runner-sequence'
import { ActionState } from '@ts-pipeline/task'
import { delay } from '@ts-pipeline/ts-core'

export async function deployApp() {
  console.warn(
    'WARN! This example no render anything, just display result of raw sequence run. Explore code for details',
  )

  const { promise } = sequence(
    //
    lint,
    build,
    setupStep(deploy, { registry: 'yarn' }),
  )
  const result = await promise

  console.log(`result "${result}"`)
}

// region: some stuff for example

const simulateWork = async (cycles: number, ui: ActionState) => {
  let cycle = 0
  while (cycle < cycles) {
    const cycleSize = 100 / cycles
    ui.onProgress({
      total: 100,
      loaded: cycleSize * cycle,
    })
    await delay(100)
    cycle++
  }
}

const lint = declareStep({
  name: 'lint',
  action: async ui => {
    ui.onData('do some linting')
    await simulateWork(5, ui)
  },
})

const build = declareStep({
  name: 'build',
  action: async ui => {
    ui.onData('do some building')
    await simulateWork(10, ui)
    return {
      artifactPath: 'some/path/to/my/build.tar',
    }
  },
})

interface DeployProps {
  registry: 'npm' | 'yarn' | 'github'
}
const deploy = declareStep({
  name: 'deploy',
  action: async (ui, props: DeployProps) => {
    ui.onData(`deploy to ${props.registry}`)
    await simulateWork(20, ui)

    return props.registry
  },
})
