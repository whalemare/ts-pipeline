import { Unsubscriber } from '@ts-pipeline/ts-core'

export interface AppRender {
  render(): Unsubscriber
}
