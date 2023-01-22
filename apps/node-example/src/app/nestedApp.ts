import { pipeline } from '@ts-pipeline/core'
import { createStep } from '@ts-pipeline/core'
import { delay } from '@ts-pipeline/ts-core'

import { sum } from '../steps/sum'

// this step use nested steps like `sum`
const multiply = createStep({
  name: 'multiply',
  action: async (ui, a: number, b: number) => {
    let result = 0
    for (let index = 0; index < b; index++) {
      await delay(1000)
      ui.onProgress({ total: b, loaded: index + 1 })
      result = await sum(result, a)
    }

    return result
  },
})

export async function nestedApp() {
  await pipeline(async () => {
    await multiply(2, 4)
  })
}
