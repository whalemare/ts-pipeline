import { declareStep } from '@ts-pipeline/core'

import { simulateWork } from './simulateWork'

export const steps = {
  lint: declareStep({
    name: 'lint',
    action: async ui => {
      ui.onData('do some linting')
      await simulateWork(20, ui)
    },
  }),
  build: declareStep({
    name: 'build',
    action: async ui => {
      ui.onData(`do some building`)
      await simulateWork(40, ui)
      return {
        artifactPath: 'some/path/to/my/build.tar',
      }
    },
  }),
  deploy: declareStep({
    name: 'deploy',
    action: async (
      ui,
      props: {
        registry: 'npm' | 'yarn' | 'github'
      },
    ) => {
      ui.onData(`deploy to ${props.registry}`)
      await simulateWork(80, ui)

      return props.registry
    },
  }),
}
