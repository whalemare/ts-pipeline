import type { Step } from '@ts-pipeline/core'

export type StepOutput<S extends Step> = S extends Step<infer _I, infer O> ? O : never
