import { Keyable } from '@ts-pipeline/ts-core'
import { RequestStoreState } from 'mobx-request'

export interface ActionState {
  onProgress: RequestStoreState['onProgress']

  /**
   * Signal for your request, that is should be aborted
   *
   * Can be passed directly to axios, fetch, exec, child_process and more systems.
   */
  signal: RequestStoreState['signal']

  /**
   * When your action emit some messages, you can use this method to show it in the output
   * @param msg - text
   */
  onData: (msg: string | number) => void
}
