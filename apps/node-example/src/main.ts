import { pipeline } from '@ts-pipeline/core'

import { progress } from './steps/progress'
import { sum } from './steps/sum'
import { ticker } from './steps/ticker'
import { tickerLargeHistory } from './steps/tickerLargeHistory'

async function run() {
  await pipeline(async () => {
    const result = await sum(1, 3)

    void tickerLargeHistory(250 * result)
    void ticker(500)
    void progress(100)
    // void error(3000)
  })
}

void run()
