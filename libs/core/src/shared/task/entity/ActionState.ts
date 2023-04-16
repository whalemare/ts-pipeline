import type { RequestStoreState } from 'mobx-request'

import type { DataMessage } from '../DataMessage'

import { ActionLogger } from './ActionLogger'

export interface ActionState {
  logger: ActionLogger

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
   * @deprecated use logger
   */
  onData: (msg: DataMessage | DataMessage['value']) => void

  setName: (name: string) => void
}
