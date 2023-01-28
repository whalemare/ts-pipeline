import { Registry } from '@ts-pipeline/task'
import { Optional } from '@ts-pipeline/ts-core'

let registryInstance: Optional<Registry> = undefined

export function overrideRegistry(registry: Registry) {
  registryInstance = registry
}

export function getRegistry() {
  if (!registryInstance) {
    throw new Error('You must use your steps inside `workflow` function')
  }

  return registryInstance
}
