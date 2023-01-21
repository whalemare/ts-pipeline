// any required for autotypings
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Optional } from '@ts-pipeline/ts-core'
import { makeObservable, observable, runInAction } from 'mobx'
import { RequestStore } from 'mobx-request'

import { Queue } from '../queue/Queue'

import { ActionState } from './ActionState'
import { TaskStoreProps } from './TaskStoreProps'

export class TaskStore<A extends any[] = any, R = any> {
  @observable
  name = 'task:unknown'

  @observable
  args: Optional<A> = undefined

  history: Queue<string>

  request = new RequestStore<R, A>(async (args, requestState) => {
    runInAction(() => {
      this.args = args
    })
    const state: ActionState = {
      onProgress: requestState.onProgress,
      signal: requestState.signal,
      onData: this.onData,
    }

    return this.props.action(state, ...args)
  })

  onData = (msg: string | number) => {
    this.history.enqueue(`${msg}`)
  }

  constructor(private props: TaskStoreProps<A, R>) {
    if (props.name) {
      this.name = props.name
    }
    if (props.historySize) {
      this.history = new Queue<string>(props.historySize)
    } else {
      this.history = new Queue<string>(5)
    }

    makeObservable(this)
  }
}
