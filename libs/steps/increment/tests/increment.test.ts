import { overrideRegistry } from '@ts-pipeline/core'
import { PipelineRegistryStore } from '@ts-pipeline/core'
import * as jetpack from 'fs-jetpack'

import { IncrementType } from '../src/shared/IncrementType'
import { increment } from '../src/shared/increment'

describe('increment', () => {
  const dir = jetpack.cwd('libs/steps/increment/tests/assets/0.0.1-1').path()

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
    const result = await increment({
      type: IncrementType.NONE,
      platform: 'node',
      dir,
    })

    console.log(result)
  })
})
