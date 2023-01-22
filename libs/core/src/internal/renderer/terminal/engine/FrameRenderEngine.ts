import { composeSubscribe, Unsubscriber } from '@ts-pipeline/ts-core'
import { makeObservable, observable, reaction, runInAction } from 'mobx'
import { Terminal } from 'terminal-kit'

import { PipelineRegistryStore } from '../../../registry/PipelineRegistryStore'
import { TaskStringRenderable } from '../../../task/renderable/TaskStringRenderable'

export class FrameRenderEngine {
  private interval: number

  @observable
  frame = 0

  private renderers = {
    task: new TaskStringRenderable(),
  }

  render = (): Unsubscriber => {
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
    }, this.interval)

    return composeSubscribe([frameRenderer, () => clearInterval(frameTicker)])
  }

  constructor(
    private terminal: Terminal,
    private registry: PipelineRegistryStore,
    private fps = 25,
  ) {
    this.interval = 1000 / this.fps
    makeObservable(this)
  }
}
