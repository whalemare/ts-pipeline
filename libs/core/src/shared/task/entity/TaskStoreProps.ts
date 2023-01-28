import { Optional } from '@ts-pipeline/ts-core'

import { ActionState } from './ActionState'

export interface TaskStoreProps<I = any, O = any> {
  name?: string

  /**
   * Will be shown 5 last messages as task output report
   *
   * @default 5
   */
  historySize?: number

  /**
   * You can do what you want with displaying arguments of your task, we just nicely format it if it's not primitive
   *
   * Parameter is optional, because we can call it before task execution, for display something if you want
   */
  formatArgs?: (args: Optional<I>) => unknown

  action: (state: ActionState, input: I) => Promise<O>
}
