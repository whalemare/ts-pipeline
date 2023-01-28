/* eslint-disable @typescript-eslint/no-explicit-any */
import { TaskStoreProps } from '@ts-pipeline/task'

import { Step } from './Step'

export const declareStep = <I = any, O = any>(factory: TaskStoreProps<I, O>): Step<I, O> => {
  return factory
}
