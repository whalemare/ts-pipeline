import { PipelineRegistryStore } from '../internal/registry/PipelineRegistryStore'

import { rendererInstance } from './global/rendererInstance'

interface PipelineProps {
  name: string
  registry?: PipelineRegistryStore
}

export const pipeline = async (func: () => Promise<void>, props?: PipelineProps) => {
  if (props?.registry) {
    // TODO: add override pipeline registry root for support sub-pipelines
  }

  rendererInstance.render()

  await func()
}
