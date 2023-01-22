import { nestedApp } from './app/nestedApp'

async function run() {
  await nestedApp()

  // await pipeline(async () => {
  //   void ticker(1000)

  //   const result = await sum(1, 3)
  //   await multiply(result, 2)

  //   void tickerLargeHistory(250 * result)
  //   void progress(100)

  //   await shell('ls -a')
  // })
}

void run()
