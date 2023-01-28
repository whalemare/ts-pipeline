/* eslint-disable no-console */
import { ReactInkRender } from '@ts-pipeline/renderer-react-ink'
import { sequence } from '@ts-pipeline/runner-sequence'

import { steps } from './utils/steps'

export async function manualRenderApp() {
  const runnable = sequence(
    'manualRenderApp',
    // create sequence of steps
    steps.lint,
    steps.build,
  )

  // render registry emited by sequence
  new ReactInkRender().render(runnable)

  // run sequence
  await runnable.run(void 0)

  // exit when finished
  process.exit(0)
}
