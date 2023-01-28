import { RequestStore } from 'mobx-request'

import { TaskStore } from '../TaskStore'

export interface Registry<I = any, O = any> {
  tasks: TaskStore[]
  request: RequestStore<O, [I]>
}
