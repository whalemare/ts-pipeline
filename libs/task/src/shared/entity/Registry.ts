import { RequestStore } from 'mobx-request'

import { TaskStore } from '../TaskStore'

export interface Registry {
  process: RequestStore<void>
  tasks: TaskStore[]
}
