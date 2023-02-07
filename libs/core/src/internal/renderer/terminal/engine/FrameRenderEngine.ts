// import { TaskStringRenderable } from '@ts-pipeline/react-renderer'
// import { composeSubscribe, Unsubscriber } from '@ts-pipeline/ts-core'
// import { makeObservable, observable, reaction, runInAction } from 'mobx'
// import { Terminal } from 'terminal-kit'

// import { PipelineRegistryStore } from '../../../registry/PipelineRegistryStore'

// export class FrameRenderEngine {
//   private interval: number
//   private prevOutputLengthLine = 0

//   @observable
//   frame = 0

//   private renderers = {
//     task: new TaskStringRenderable(),
//   }

//   render = (): Unsubscriber => {
//     const frameRenderer = reaction(
//       () => this.frame,
//       frame => {
//         if (this.prevOutputLengthLine) {
//           this.terminal.eraseLine()
//         }
//         const main = this.renderers['task'].render(this.registry.workflowTask, frame)
//         const lines = this.registry.tasks
//           .map(task => {
//             return this.renderers['task'].render(task, frame)
//           })
//           .join('\n')
//         const output = `${main}\n\n${lines}`
//         this.prevOutputLengthLine = output.split('\n').length
//         this.terminal(output)
//       },
//     )

//     const frameTicker = setInterval(() => {
//       runInAction(() => {
//         this.frame++
//       })
//     }, this.interval)

//     return composeSubscribe([frameRenderer, () => clearInterval(frameTicker)])
//   }

//   constructor(
//     private terminal: Terminal,
//     private registry: PipelineRegistryStore,
//     private fps = 25,
//   ) {
//     this.interval = 1000 / this.fps
//     makeObservable(this)
//   }
// }
