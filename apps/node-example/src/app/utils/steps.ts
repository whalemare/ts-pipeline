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
  tests: declareStep({
    name: 'tests',
    action: async (ui, _props?: { allowPercentage?: number }) => {
      await simulateWork(1000, ui)
    },
  }),
  build: declareStep({
    name: 'build',
    action: async ui => {
      ui.onData(`do some building`)
      await simulateWork(1, ui)
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
      await simulateWork(800, ui)

      return props.registry
    },
  }),
}
