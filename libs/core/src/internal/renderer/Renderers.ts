import type { Renderable } from '@ts-pipeline/renderer/core'
import type { TaskStore } from '@ts-pipeline/task'

export interface Renderers<Output> {
  task: Renderable<TaskStore, Output>
}
