import { renderToConsole } from '@ts-pipeline/renderer-core'
import { sequence, withData } from '@ts-pipeline/runner-sequence'

import { buildIOSStep } from './shared/buildIOSStep'

describe('stepBuildIos', () => {
  it('should work', async () => {
    await renderToConsole(
      sequence(
        'build ios',

        withData(buildIOSStep, {
          cwd: '',
        }),
      ),
    )
  })
})
