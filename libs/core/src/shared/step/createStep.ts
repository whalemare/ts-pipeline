/* eslint-disable @typescript-eslint/no-explicit-any */
import { TaskStoreProps } from '@ts-pipeline/core'

import { task } from '../task/task'

/**
 * Fabric function used for step manipulation
 */
export const createStep = <A = any, R = any>(factory: TaskStoreProps<A, R>) => {
  return task(factory)
}
