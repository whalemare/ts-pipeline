import type { Registry } from '@ts-pipeline/task'

export interface Process<I = any, O = any> {
  registry: Registry<I, O>
}
