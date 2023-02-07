import type { Step } from '@ts-pipeline/core'

export type StepInput<S extends Step> = S extends Step<infer I> ? I : never
