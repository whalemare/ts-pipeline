import { ActionState } from './ActionState'

export interface TaskStoreProps<I = any, O = any> {
  name?: string

  /**
   * Will be shown 5 last messages as task output report
   *
   * @default 5
   */
  historySize?: number

  action: (state: ActionState, input: I) => Promise<O>
}
