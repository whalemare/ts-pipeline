import { workflow } from '@ts-pipeline/core'

import { ticker } from '../steps/ticker'

export async function endlessApp() {
  await workflow(async () => {
    let tick = 0
    setInterval(() => {
      console.log('tick', tick++)
    }, 500)
    await Promise.all([ticker(1000), ticker(500)])
  })
}
