import type { Registry } from '@ts-pipeline/core'
import type { Unsubscriber } from '@ts-pipeline/ts-core'

export interface AppRender {
  render(registry: Registry): Unsubscriber
}
