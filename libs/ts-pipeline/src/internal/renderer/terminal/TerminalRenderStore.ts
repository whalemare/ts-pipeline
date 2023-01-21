import { composeSubscribe, Optional, Unsubscriber } from '@ts-pipeline/ts-core'
import { action, makeObservable, observable, reaction, runInAction } from 'mobx'
import { createTerminal } from 'terminal-kit'

import { PipelineRegistryStore } from '../../registry/PipelineRegistryStore'
import { AppRender } from '../AppRender'

import { TerminalRenderers } from './TerminalRenderers'

export class TerminalRenderStore implements AppRender {
  private terminal = createTerminal({ appId: 'core', appName: 'core' })

  private cancelRender: Optional<Unsubscriber> = undefined

  @observable
  frame = 0

  @action
  render = () => {
    const frameRenderer = reaction(
      () => this.frame,
      frame => {
        this.terminal.clear()

        const header = `Tasks: ${this.registry.tasks.length}`
        const lines = this.registry.tasks
          .map(task => {
            return this.renderers['task'].render(task, frame)
          })
          .join('\n')

        this.terminal(header + '\n\n\n' + lines)
      },
    )

    const frameTicker = setInterval(() => {
      runInAction(() => {
        this.frame++
      })
    }, 40)

    this.cancelRender = composeSubscribe([frameRenderer, () => clearInterval(frameTicker)])

    return this.cancelRender
  }

  constructor(private registry: PipelineRegistryStore, private renderers: TerminalRenderers) {
    makeObservable(this)
  }
}
