import { workflow } from '@ts-pipeline/core'

import { sum } from '../steps/sum'

export async function workflowApp() {
  await workflow(async () => {
    let result = await sum(1, 2)
    result = await sum(result, 2)
    result = await sum(result, 2)
    result = await sum(result, 2)
    return result
  })
}
