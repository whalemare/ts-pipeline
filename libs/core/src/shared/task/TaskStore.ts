// any required for autotypings
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Existed, Optional } from '@ts-pipeline/ts-core'
import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import { RequestStore } from 'mobx-request'

import { Step } from '../step/Step'

import { DataMessage } from './DataMessage'
import { ActionLogger } from './entity/ActionLogger'
import { ActionState } from './entity/ActionState'
import { TaskStoreProps } from './entity/TaskStoreProps'

export class TaskStore<A = any, R = any> implements Step<A, R> {
  /**
   * By default we are hide arguments of task
   */
  private argsFormatter: Existed<TaskStoreProps<A, R>['formatArgs']> = () => ''

  @observable
  private overridedName: Optional<string> = undefined

  @computed
  get name() {
    if (this.overridedName) {
      return this.overridedName
    }

    if (typeof this.props.name === 'string') {
      return this.props.name
    }

    // TODO: this is can be function generator?
    return this.props.name ?? 'task:unknown'
  }

  @observable
  history: DataMessage[] = []

  @observable
  args: Optional<unknown> = undefined

  logger: ActionLogger = {
    log: msg => this.onData(msg),
    warn: msg => this.onData({ type: 'warn', value: msg }),
    error: msg => this.onData({ type: 'error', value: msg }),
  }

  request = new RequestStore<R, A>(async (args, requestState) => {
    runInAction(() => {
      this.args = this.argsFormatter(args)
    })
    const state: ActionState = {
      onProgress: requestState.onProgress,
      signal: requestState.signal,
      onData: this.onData,
      setName: this.setName,
      logger: this.logger,
    }

    return this.action(state, args)
  })

  action = async (ui: ActionState, input: A): Promise<R> => {
    return this.props.action(ui, input)
  }

  @action
  onData = (msg: DataMessage | DataMessage['value']) => {
    if (msg && typeof msg === 'object') {
      this.history.push(msg)
    } else {
      const dataMessage: DataMessage = {
        type: 'message',
        value: msg,
      }
      this.history.push(dataMessage)
    }
  }

  @action
  setName = (name: string) => {
    this.overridedName = name
  }

  constructor(private props: TaskStoreProps<A, R>) {
    if (props.formatArgs) {
      this.argsFormatter = props.formatArgs
    }
    this.args = this.argsFormatter?.(undefined)

    makeObservable(this)
  }
}
