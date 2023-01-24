import { overrideRegistry } from '@ts-pipeline/core'
import { PipelineRegistryStore } from '@ts-pipeline/core'
import * as jetpack from 'fs-jetpack'

import { IncrementType } from '../src/shared/IncrementType'
import { increment } from '../src/shared/increment'

describe('increment', () => {
  beforeEach(() => {
    overrideRegistry(
      new PipelineRegistryStore({
        name: 'test',
        fn: async () => {
          // do nothing
        },
      }),
    )
  })

  test('should none', async () => {
    await increment({
      type: IncrementType.NONE,
      platform: 'node',
      dir: jetpack.path('libs/step-increment/tests/assets/0.0.1-1'),
    })
  })

  test('should increment android', async () => {
    await increment({
      type: IncrementType.NONE,
      platform: 'android',
      dir: jetpack.path('libs/step-increment/tests/assets/ReactNativeApp'),
    })
  })

  test('should increment ios', async () => {
    await increment({
      type: IncrementType.PATCH,
      platform: 'ios',
      dir: jetpack.path('libs/step-increment/tests/assets/ReactNativeApp'),
    })
  })

  test('should allow pass custom version', async () => {
    await increment({
      platform: 'ios',
      dir: jetpack.path('libs/step-increment/tests/assets/ReactNativeApp'),
      version: {
        build: 2,
        marketing: '0.0.2',
      },
    })
  })
})
