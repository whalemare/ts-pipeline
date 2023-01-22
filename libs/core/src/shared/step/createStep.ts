import { TaskStoreProps } from '@ts-pipeline/task'

import { task } from '../task'

/**
 * Fabric function used for step manipulation
 */
export const createStep = <A extends any[] = any, R = any>(factory: TaskStoreProps<A, R>) => {
  return task(factory)
}
