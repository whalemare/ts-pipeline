import { makeStepExecutable } from '@ts-pipeline/core'
import * as jetpack from 'fs-jetpack'

import { IncrementType } from '../src/shared/IncrementType'
import { increment } from '../src/shared/increment'

const step = makeStepExecutable(increment)

describe('increment', () => {
  test('0.0.1 should be parsed', async () => {
    const [version] = await step({
      type: IncrementType.NONE,
      platform: 'node',
      dir: jetpack.path('libs/step-increment/tests/assets/0.0.1'),
    })

    expect(version).toStrictEqual({
      marketing: '0.0.1',
      build: 0,
    })
  })

  test('0.0.1-1 should be parsed', async () => {
    const [version] = await step({
      type: IncrementType.NONE,
      platform: 'node',
      dir: jetpack.path('libs/step-increment/tests/assets/0.0.1-1'),
    })

    expect(version).toStrictEqual({
      marketing: '0.0.1',
      build: 1,
    })
  })

  test('should increment android', async () => {
    await step({
      type: IncrementType.NONE,
      platform: 'android',
      dir: jetpack.path('libs/step-increment/tests/assets/ReactNativeApp'),
    })
  })

  test('should increment ios', async () => {
    await step({
      type: IncrementType.PATCH,
      platform: 'ios',
      dir: jetpack.path('libs/step-increment/tests/assets/ReactNativeApp'),
    })
  })

  test('should allow pass custom version', async () => {
    await step({
      platform: 'ios',
      dir: jetpack.path('libs/step-increment/tests/assets/ReactNativeApp'),
      version: {
        build: 2,
        marketing: '0.0.2',
      },
    })
  })
})
