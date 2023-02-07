// any required for autotypings
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ActionState } from '../task/entity/ActionState'

/**
 * Step - it's just a regular function that you can use in your pipeline
 */
export interface Step<I = any, O = any> {
  name?: string

  action: (ui: ActionState, input: I) => Promise<O>
}
