// any required for autotypings
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Optional } from '@ts-pipeline/ts-core'
import { makeObservable, observable, runInAction } from 'mobx'
import { RequestStore } from 'mobx-request'

import { QueueOutputable } from './QueueOutputable'
import { ActionState } from './entity/ActionState'
import { History as History } from './entity/History'
import { TaskStoreProps } from './entity/TaskStoreProps'

export class TaskStore<A = any, R = any> {
  @observable
  name

  @observable
  history: History

  @observable
  args: Optional<unknown> = undefined

  request = new RequestStore<R, A>(async (args, requestState) => {
    runInAction(() => {
      if (this.props.formatArgs) {
        this.args = this.props.formatArgs(args)
        console.log('format this.args', this.args)
      } else {
        this.args = args
      }
    })
    const state: ActionState = {
      onProgress: requestState.onProgress,
      signal: requestState.signal,
      onData: this.onData,
    }

    return this.props.action(state, args)
  })

  onData = (msg: string | number) => {
    const string = `${msg}`
    const array = string.split('\n')
    for (const item of array) {
      this.history.push(item)
    }
  }

  constructor(private props: TaskStoreProps<A, R>) {
    this.name = props?.name ?? 'task:unknown'
    this.history = new QueueOutputable(props?.historySize ?? 5)
    if (props.formatArgs) {
      this.args = props.formatArgs(undefined)
    }

    makeObservable(this)
  }
}
