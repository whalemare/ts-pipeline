import { declareStep } from '@ts-pipeline/core'
import { increment, IncrementType } from '@ts-pipeline/step-increment'
const sequence = (...steps: any[]) => {}

const number = declareStep({
  name: 'number',
  action: async () => 4,
})

// const increment = declareStep({
//   name: 'increment',
//   config: () => ({ incrementBy: 1 }),
//   action: async (ui, input: number) => input + 1,
// })

export function pipelineApp() {
  sequence(
    number,
    increment({
      platform: 'node',
      type: IncrementType.PATCH,
    }),
  )
}
