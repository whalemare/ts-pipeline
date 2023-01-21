import { ActionState } from './ActionState'

export interface TaskStoreProps<A extends any[] = any, R = any> {
  name?: string

  /**
   * Will be shown 5 last messages as task output report
   *
   * @default 5
   */
  historySize?: number

  action: (state: ActionState, ...args: A) => Promise<R>
}
