import { Registry } from '@ts-pipeline/task'

import { ReactInkRender } from './ReactInkRender'

export const render = async (runnable: Registry) => {
  // render registry emited by sequence
  new ReactInkRender().render(runnable)

  // run sequence
  await runnable.run(void 0)
}
