import { ReactRenderer } from '@ts-pipeline/renderer-react'
import { workflow } from '@ts-pipeline/runner-workflow'

import { sum } from '../steps/sum'
import { ticker } from '../steps/ticker'

export async function workflowReactApp() {
  await workflow(
    async () => {
      let result = await sum({ left: 1, right: 2 })
      result = await sum({ left: 2, right: result })
      result = await sum({ left: result, right: result })
      await ticker(1000)
      return result
    },
    {
      name: 'react',
      renderer: new ReactRenderer(),
    },
  )
}
