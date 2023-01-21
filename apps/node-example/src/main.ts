import { createStep, pipeline } from '@ts-pipeline/ts-pipeline'

// const logger = async (ms: number) => {
//   const log = createLogUpdate(stdout)

//   let ticks = 0
//   while (true) {
//     log('tick ' + ticks++)
//     await delay(ms)
//   }
// }

// const tasks = () => {
//   const renderer = new TerminalRenderStore()
//   const taskA = new TaskUiStore('taskA')
//   const taskB = new TaskUiStore('taskB')
//   renderer.addTask(taskA)
//   renderer.addTask(taskB)

//   let aTicks = 0
//   setInterval(() => {
//     taskA.onData('A' + aTicks++)
//   }, 1000)

//   let bTicks = 0
//   setInterval(() => {
//     taskB.onData('B' + bTicks++)
//   }, 500)

//   setInterval(() => {
//     console.log('booobobobo')
//   }, 2000)
// }

const sum = createStep({
  name: 'sum',
  action: async (ui, a: number, b: number) => {
    console.log(`sum action
    ui = ${ui}
    a = ${a}
    b = ${b}
    
    `)
    return a + b
  },
})

const ticker = createStep({
  name: 'ticker',
  historySize: 1,
  action: async (ui, ms: number) => {
    let ticks = 0

    setInterval(() => {
      ui.onData(ticks++)
    }, Number(ms))

    return new Promise(() => {
      // infinite
    })
  },
})

const tickerLargeHistory = createStep({
  name: 'ticker-large-history',
  historySize: 10,
  action: async (ui, ms: number) => {
    let ticks = 0

    setInterval(() => {
      ui.onData(ticks++)
    }, Number(ms))

    return new Promise(() => {
      // infinite
    })
  },
})

const error = createStep({
  name: 'error',
  action: async (ui, ms: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('ooops!'))
      }, ms)
    })
  },
})

const progress = createStep({
  name: 'progress',
  action: async (ui, maxTicks: number) => {
    return new Promise((resolve, reject) => {
      let ticks = 0

      const clear = setInterval(() => {
        if (ticks >= maxTicks) {
          clearInterval(clear)
          resolve(ticks)
        }
        ui.onProgress({ total: maxTicks, loaded: ticks++ })
      }, 100)
    })
  },
})

async function run() {
  await pipeline(async () => {
    const result = await sum(1, 3)

    void tickerLargeHistory(1000)
    void ticker(500)
    void progress(100)
    // void error(3000)
  })
}

run()
