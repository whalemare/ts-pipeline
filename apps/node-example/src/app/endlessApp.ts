import { workflow } from '@ts-pipeline/core'

import { ticker } from '../steps/ticker'

export async function endlessApp() {
  await workflow(async () => {
    await Promise.all([ticker(1000), ticker(500)])
  })
}
