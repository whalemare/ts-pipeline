import { TaskStore } from '../task/TaskStore'

import { Renderable } from './Renderable'

export interface Renderers<Output> {
  task: Renderable<TaskStore, Output>
}
