import { Step } from '@ts-pipeline/core'

import { ParallelRunnerStore } from './ParallelRunnerStore'

export const parallel = <I>(initial: Step<I>, ...steps: Step<I>[]) => {
  return new ParallelRunnerStore([initial, ...steps])
}
