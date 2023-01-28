/* eslint-disable no-console */
import { ReactInkRender } from '@ts-pipeline/renderer-react-ink'
import { sequence } from '@ts-pipeline/runner-sequence'

import { steps } from './utils/steps'

export async function manualRenderApp() {
  const { registry } = sequence(
    // create sequence of steps
    steps.lint,
    steps.build,
  )

  // render registry emited by sequence
  new ReactInkRender().render(registry)

  // run sequence
  await registry.run(void 0)

  // exit when finished
  process.exit(0)
}
