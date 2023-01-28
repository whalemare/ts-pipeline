/* eslint-disable no-console */
import { ReactInkRender } from '@ts-pipeline/renderer-react-ink'
import { sequence } from '@ts-pipeline/runner-sequence'
import { Registry } from '@ts-pipeline/task'

import { steps } from './utils/steps'

export async function pipelineApp() {
  await pipeline(
    sequence(
      // create sequence of steps
      steps.lint,
      steps.build,
    ),
  )
}

const pipeline = async (runnable: Registry<void, unknown>) => {
  // render registry emited by sequence
  new ReactInkRender().render(runnable)

  // run sequence
  await runnable.run()

  // exit when finished
  process.exit(0)
}
