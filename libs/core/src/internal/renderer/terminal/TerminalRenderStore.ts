import { composeSubscribe, type Unsubscriber } from '@ts-pipeline/ts-core'
import { action, makeObservable, observable, reaction, runInAction } from 'mobx'
// @ts-ignore
import { createTerminal } from 'terminal-kit'

import { PipelineRegistryStore } from '../../registry/PipelineRegistryStore'
import { TaskStringRenderable } from '../../task/renderable/TaskStringRenderable'
import { type AppRender } from '../AppRender'

import { ReactionRenderEngine } from './ReactionRenderEngine'

export class TerminalRenderStore implements AppRender {
  private terminal = createTerminal({ appId: 'core', appName: 'core' })

  private renderers = {
    task: new TaskStringRenderable(),
  }

  @observable
  frame = 0

  @action
  render = (): Unsubscriber => {
    return new ReactionRenderEngine(this.terminal, this.registry).render()
  }

  private frameRenderer = () => {
    const frameRenderer = reaction(
      () => this.frame,
      frame => {
        this.terminal.clear()

        const main = this.renderers['task'].render(this.registry.workflowTask, frame)

        const lines = this.registry.tasks
          .map(task => {
            return this.renderers['task'].render(task, frame)
          })
          .join('\n')

        this.terminal(`${main}\n\n${lines}`)
      },
    )

    const frameTicker = setInterval(() => {
      runInAction(() => {
        this.frame++
      })
    }, 40)

    return composeSubscribe([
      frameRenderer,
      () => clearInterval(frameTicker),
      () => runInAction(() => this.frame++),
    ])
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
