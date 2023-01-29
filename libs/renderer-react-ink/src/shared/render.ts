import { Registry } from '@ts-pipeline/core'

import { ReactInkRender } from './ReactInkRender'

export const render = async (runnable: Registry) => {
  // render registry emited by sequence
  new ReactInkRender().render(runnable)

  // process.stdout.write = new Proxy(process.stdout.write, {
  //   apply: (target, thisArg, argumentsList) => {
  //     const [message] = argumentsList
  //     const log = fs.createWriteStream('log.log')
  //     log.write(message)
  //     // @ts-ignore
  //     return target.apply(thisArg, argumentsList)
  //   },
  // })

  // run sequence
  await runnable.run(void 0)
}
