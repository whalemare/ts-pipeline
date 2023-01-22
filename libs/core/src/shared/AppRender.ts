import type { Unsubscriber } from '@ts-pipeline/ts-core'

import { PipelineRegistryStore } from '../internal/registry/PipelineRegistryStore'

export interface AppRender {
  render(registry: PipelineRegistryStore): Unsubscriber
}
