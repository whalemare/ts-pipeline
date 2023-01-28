import { workflow } from '@ts-pipeline/runner-workflow'

import { sum } from '../steps/sum'

export async function workflowApp() {
  await workflow(async () => {
    let result = await sum({ left: 1, right: 2 })
    result = await sum({ left: result, right: 2 })
    return result
  })
}
