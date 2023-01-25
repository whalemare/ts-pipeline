// import { AppRender } from '@ts-pipeline/renderer-core'
// import { type Unsubscriber } from '@ts-pipeline/ts-core'
// import { action, makeObservable } from 'mobx'
// // @ts-ignore
// import { createTerminal } from 'terminal-kit'

// import { PipelineRegistryStore } from '../../../shared/PipelineRegistryStore'

// import { ReactionRenderEngine } from './engine/ReactionRenderEngine'

// export class TerminalRenderStore implements AppRender {
//   private terminal = createTerminal({ appId: 'core', appName: 'core' })

//   @action
//   render = (): Unsubscriber => {
//     return new ReactionRenderEngine(this.terminal, this.registry).render()
//   }

//   constructor(private registry: PipelineRegistryStore) {
//     makeObservable(this)

//     this.terminal.on('key', (key: string) => {
//       if (key === 'CTRL_C') {
//         this.terminal.grabInput(false)
//         // this.terminal.clear()
//         process.exit()
//       }
//     })
//   }
// }
