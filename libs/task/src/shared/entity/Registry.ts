import { TaskStore } from '../TaskStore'

import { Runner } from './Runner'

export type Registry<I = any, O = any> = Runner<I, O> & {
  mainTask: TaskStore<I, O>
  nested: TaskStore[]
}
