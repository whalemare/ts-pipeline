/* eslint-disable no-console */

import { workflow } from '@ts-pipeline/runner-workflow'

import { ticker } from '../steps/ticker'

export async function endlessApp() {
  await workflow(async () => {
    let tick = 0
    setInterval(() => {
      console.log('tick', tick++)
    }, 5000)
    await Promise.all([ticker(1000), ticker(500)])
  })
}
