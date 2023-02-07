// any required for autotypings
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Optional } from '@ts-pipeline/ts-core'
import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import { RequestStore } from 'mobx-request'

import { Step } from '../step/Step'

import { DataMessage } from './DataMessage'
import { ActionState } from './entity/ActionState'
import { TaskStoreProps } from './entity/TaskStoreProps'

export class TaskStore<A = any, R = any> implements Step<A, R> {
  /**
   * By default we are hide arguments of task
   */
  private argsFormatter: TaskStoreProps<A, R>['formatArgs'] = () => ''

  @computed
  get name() {
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

  request = new RequestStore<R, A>(async (args, requestState) => {
    runInAction(() => {
      if (this.props.formatArgs) {
        this.args = this.props.formatArgs(args)
      } else {
        this.args = args
      }
    })
    const state: ActionState = {
      onProgress: requestState.onProgress,
      signal: requestState.signal,
      onData: this.onData,
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

  constructor(private props: TaskStoreProps<A, R>) {
    if (props.formatArgs) {
      this.argsFormatter = props.formatArgs
    }
    this.args = this.argsFormatter?.(undefined)

    makeObservable(this)
  }
}
