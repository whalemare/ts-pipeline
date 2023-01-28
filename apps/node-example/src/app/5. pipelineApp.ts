/* eslint-disable no-console */
import { Process, Step } from '@ts-pipeline/core'
import { sequence, setupStep } from '@ts-pipeline/runner-sequence'

import { steps } from './utils/steps'

type PipelineStep<I = any, O extends Process<I, O> = any> = Step<I, O>

// const pipeline = (...list: PipelineStep[]) => {
//   const registry = new SequenceRunnerStore<void>([
//     {
//       name: props?.name ?? 'workflow',
//       action: func,
//     },
//   ])
//   overrideRegistry(registry)

//   const app: AppRender = props?.renderer ? props.renderer : new ReactIncRender()
//   const finishRender = app.render(registry)

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   await registry.request.fetch(undefined as any)

//   finishRender()
//   process.exit(0)
// }

// @ts-ignore
const parallel = <I, O>(...steps: Step[]): Step<I, O> => {}

export async function pipelineApp() {
  sequence(
    steps.lint,
    steps.build,

    parallel(
      setupStep(steps.deploy, { registry: 'yarn' }),
      setupStep(steps.deploy, { registry: 'npm' }),
      setupStep(steps.deploy, { registry: 'github' }),
    ),
  )
}
