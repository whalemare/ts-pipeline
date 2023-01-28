import type { PipelineRegistryStore } from './shared/PipelineRegistryStore'

// @index(['./shared/**/*.(ts|tsx)', '!./**/*.d.(ts|tsx)'], f => `export * from '${f.path}'`)
export * from './shared/getRegistry'
export * from './shared/PipelineRegistryStore'
export * from './shared/step/createStep'
export * from './shared/step/declareStep'
export * from './shared/step/Step'
export * from './shared/task'
export * from './shared/workflow'
// @endindex

export type PipelineRegistryStoreType = PipelineRegistryStore
