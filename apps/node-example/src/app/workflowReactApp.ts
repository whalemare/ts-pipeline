import { workflow } from '@ts-pipeline/core'
import { ReactRenderer } from '@ts-pipeline/react-renderer'

import { sum } from '../steps/sum'
import { ticker } from '../steps/ticker'

export async function workflowReactApp() {
  await workflow(
    async () => {
      let result = await sum(1, 2)
      result = await sum(result, 2)
      result = await sum(result, 2)
      result = await sum(result, 2)
      await ticker(1000)
      return result
    },
    {
      name: 'react',
      renderer: new ReactRenderer(),
    },
  )
}
