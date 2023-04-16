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

  it(
    'skip',
    async () => {
      await expect(
        renderToConsole(
          sequence(
            'build ios',

            withData(buildIOSStep, {
              cwd: '/Users/whalemare/dev/hadam/react-native-hadam-monorepo/apps/mobile-client/ios',
              configuration: 'Debug',
            }),
          ),
        ),
      ).rejects.toBeTruthy()
    },
    60000 * 1000,
  )
})
