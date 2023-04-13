import { renderToConsole } from '@ts-pipeline/renderer-core'
import { sequence, withData } from '@ts-pipeline/runner-sequence'

import { buildIOSStep } from './shared/buildIOSStep'

describe('stepBuildIos', () => {
  it('should throw error when unable to find .xcworkspace', async () => {
    await expect(
      renderToConsole(
        sequence(
          'build ios',

          withData(buildIOSStep, {
            cwd: '',
          }),
        ),
      ),
    ).rejects.toBeTruthy()
  })
})