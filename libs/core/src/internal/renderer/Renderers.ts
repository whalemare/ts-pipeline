import type { TaskStore } from '@ts-pipeline/task'

import type { Renderable } from './Renderable'

export interface Renderers<Output> {
  task: Renderable<TaskStore, Output>
}
