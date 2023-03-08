import { Registry } from '@ts-pipeline/core'

import { PlainConsoleRender } from './model/PlainConsoleRender'

export async function renderToConsole(registry: Registry) {
  const unsubscriber = new PlainConsoleRender().render(registry)

  await registry.run(void 0)

  unsubscriber()
}
