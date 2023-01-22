import { Unsubscriber } from '@ts-pipeline/ts-core'
import { autorun, computed, makeObservable } from 'mobx'
import { Terminal } from 'terminal-kit'

import { PipelineRegistryStore } from '../../../../shared/PipelineRegistryStore'
import { TaskReactionRender } from '../TaskReactionRender'

export class ReactionRenderEngine {
  @computed
  private get renderers() {
    return this.registry.tasks.map(task => {
      return new TaskReactionRender(task)
    })
  }

  render = (): Unsubscriber => {
    return autorun(() => {
      this.terminal.clear()
      const lines = []

      for (const item of this.renderers) {
        lines.push(item.line)
      }

      this.terminal(lines.join('\n'))
    })
  }

  constructor(private terminal: Terminal, private registry: PipelineRegistryStore) {
    makeObservable(this)
  }
}
