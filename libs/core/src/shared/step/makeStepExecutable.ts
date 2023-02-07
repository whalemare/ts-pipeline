/* eslint-disable @typescript-eslint/no-explicit-any */
import { TaskStore } from '../task/TaskStore'

import { Step } from './Step'

export const makeStepExecutable = <S extends Step>(step: S) => {
  return async (
    args: OmitFirst<Parameters<S['action']>>,
  ): Promise<Awaited<ReturnType<S['action']>>> => {
    const store = new TaskStore(step)
    return store.request.fetch(args)
  }
}

/**
 * First argument in Props[action] is always UI that genered inside module
 * User don't need to provide it
 */
type OmitFirst<T extends any[]> = T extends [any, infer R] ? R : never
