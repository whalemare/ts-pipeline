import { workflow } from '@ts-pipeline/core'
import { logs } from '@ts-pipeline/step-logs'

import { ticker } from '../steps/ticker'

export async function endlessApp() {
  await workflow(async () => {
    await Promise.all([logs(), ticker(1000), ticker(500)])
  })
}
