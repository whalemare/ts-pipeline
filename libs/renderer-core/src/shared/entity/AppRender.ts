import type { Registry } from '@ts-pipeline/task'
import type { Unsubscriber } from '@ts-pipeline/ts-core'

export interface AppRender {
  render(registry: Registry): Unsubscriber
}
