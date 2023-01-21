import { TaskStoreProps } from '../../internal/task/TaskStoreProps'
import { task } from '../task'

/**
 * Fabric function used for step manipulation
 */
export const createStep = <A extends any[] = any, R = any>(factory: TaskStoreProps<A, R>) => {
  return task(factory)
}
