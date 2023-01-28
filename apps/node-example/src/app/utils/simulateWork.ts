import { ActionState } from '@ts-pipeline/core'
import { delay } from '@ts-pipeline/ts-core'

export const simulateWork = async (cycles: number, ui: ActionState) => {
  let cycle = 0
  while (cycle < cycles) {
    const cycleSize = 100 / cycles
    ui.onProgress({
      total: 100,
      loaded: cycleSize * cycle,
    })
    await delay(100)
    cycle++
  }
}
