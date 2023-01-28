import { TaskStore } from '../TaskStore'

import { Runnable } from './Runnable'

export type Registry<I = any, O = any> = Runnable<I, O> & {
  mainTask: TaskStore<I, O>
  nested: TaskStore[]
}
