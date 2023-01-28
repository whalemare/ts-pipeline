import { Registry } from '@ts-pipeline/task'

import { Step } from './step/Step'

export interface Process<S extends Step<I, O>, I = any, O = any> {
  registry: Registry
}
