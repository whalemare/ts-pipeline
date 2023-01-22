import { overrideRegistry } from '@ts-pipeline/core'
import { PipelineRegistryStore } from '@ts-pipeline/core'
import * as jetpack from 'fs-jetpack'

import { IncrementType } from '../src/internal/entity/IncrementType'
import { increment } from '../src/shared/increment'

describe('increment', () => {
  const dir = jetpack.cwd('libs/steps/increment/tests/assets').path()

  beforeEach(() => {
    overrideRegistry(
      new PipelineRegistryStore({
        name: 'test',
        fn: async () => {},
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
