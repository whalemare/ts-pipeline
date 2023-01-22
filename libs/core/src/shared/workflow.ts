import { PipelineRegistryStore } from '../internal/registry/PipelineRegistryStore'

import { rendererInstance } from './global/rendererInstance'

interface WorkflowProps {
  name: string
  registry?: PipelineRegistryStore
}

export const workflow = async (func: () => Promise<void>, props?: WorkflowProps) => {
  if (props?.registry) {
    // TODO: add override pipeline registry root for support sub-pipelines
  }

  rendererInstance.render()

  await func()
}
