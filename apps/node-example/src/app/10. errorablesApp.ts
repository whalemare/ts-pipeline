/* eslint-disable no-console */
import { createStep } from '@ts-pipeline/core'
import { render } from '@ts-pipeline/renderer-react-ink'
import { sequence } from '@ts-pipeline/runner-sequence'
import { withRetry } from '@ts-pipeline/with-retry'

let errorsLeft = 5

const errorable = createStep({
  name: 'errorable',
  action: async () => {
    errorsLeft--
    if (errorsLeft > 0) {
      throw new Error(`Mock error`)
    }
  },
})

export async function errorablesApp() {
  await render(sequence('errorable test retry', withRetry(errorable, { count: 5, delay: 1000 })))
}
