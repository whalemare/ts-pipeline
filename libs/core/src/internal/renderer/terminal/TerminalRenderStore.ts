import { type Unsubscriber } from '@ts-pipeline/ts-core'
import { action, makeObservable } from 'mobx'
// @ts-ignore
import { createTerminal } from 'terminal-kit'

import { type AppRender } from '../../../shared/AppRender'
import { PipelineRegistryStore } from '../../registry/PipelineRegistryStore'

import { FrameRenderEngine } from './engine/FrameRenderEngine'
import { ReactionRenderEngine } from './engine/ReactionRenderEngine'

export class TerminalRenderStore implements AppRender {
  private terminal = createTerminal({ appId: 'core', appName: 'core' })

  @action
  render = (): Unsubscriber => {
    return new FrameRenderEngine(this.terminal, this.registry, 25).render()
    return new ReactionRenderEngine(this.terminal, this.registry).render()
  }

  constructor(private registry: PipelineRegistryStore) {
    makeObservable(this)

    this.terminal.on('key', (key: string) => {
      if (key === 'CTRL_C') {
        this.terminal.grabInput(false)
        // this.terminal.clear()
        process.exit()
      }
    })
  }
}
