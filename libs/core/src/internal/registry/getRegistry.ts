import { Optional } from '@ts-pipeline/ts-core'

import { PipelineRegistryStore } from './PipelineRegistryStore'

let registryInstance: Optional<PipelineRegistryStore> = undefined

export function overrideRegistry(registry: PipelineRegistryStore) {
  registryInstance = registry
}

export function getRegistry() {
  if (!registryInstance) {
    throw new Error('You must use your steps inside `workflow` function')
  }

  return registryInstance
}
