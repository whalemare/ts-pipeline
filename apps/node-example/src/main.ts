import { pipeline } from '@ts-pipeline/core'

import { shell } from './app/steps/shell'
import { progress } from './steps/progress'
import { sum } from './steps/sum'
import { ticker } from './steps/ticker'
import { tickerLargeHistory } from './steps/tickerLargeHistory'

async function run() {
  await pipeline(async () => {
    //@ts-ignore
    console.log('this inside pipeline', this)
    void ticker(1000)

    console.log('ticker caller', ticker.caller)
    const result = await sum(1, 3)

    void tickerLargeHistory(250 * result)
    void progress(100)

    await shell('ls -a')
  })
}

void run()
