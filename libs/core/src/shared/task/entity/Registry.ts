import { Step } from '../../step/Step'
import { TaskStore } from '../TaskStore'

import { Runnable } from './Runnable'

export type Registry<I = any, O = any> = Runnable<I, O> & {
  nested: TaskStore[]
} & Step<I, O>
