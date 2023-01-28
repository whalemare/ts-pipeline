import { createStep } from '@ts-pipeline/core'
import { workflow } from '@ts-pipeline/runner-workflow'
import { delay } from '@ts-pipeline/ts-core'

import { sum } from '../steps/sum'

interface MultiplyProps {
  left: number
  right: number
}
// this step use nested steps like `sum`
const multiply = createStep({
  name: 'multiply',
  action: async (ui, { left, right }: MultiplyProps) => {
    let result = 0
    for (let index = 0; index < right; index++) {
      await delay(1000)
      ui.onProgress({ total: right, loaded: index + 1 })
      result = await sum({ left, right: result })
    }

    return result
  },
})

export async function nestedApp() {
  await workflow(async () => {
    await multiply({ left: 2, right: 4 })
  })
}
