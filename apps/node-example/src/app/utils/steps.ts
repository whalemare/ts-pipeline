import { declareStep } from '@ts-pipeline/core'

import { simulateWork } from './simulateWork'

export const steps = {
  lint: declareStep({
    name: 'lint',
    action: async ui => {
      ui.onData('do some linting')
      await simulateWork(5, ui)
    },
  }),
  build: declareStep({
    name: 'build',
    action: async ui => {
      ui.onData('do some building')
      await simulateWork(10, ui)
      return {
        artifactPath: 'some/path/to/my/build.tar',
      }
    },
  }),
  deploy: declareStep<{
    registry: 'npm' | 'yarn' | 'github'
  }>({
    name: 'deploy',
    action: async (ui, props) => {
      ui.onData(`deploy to ${props.registry}`)
      await simulateWork(20, ui)

      return props.registry
    },
  }),
}
