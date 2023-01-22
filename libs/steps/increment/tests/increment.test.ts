import * as jetpack from 'fs-jetpack'

import { IncrementType } from '../src/internal/entity/IncrementType'
import { increment } from '../src/shared/increment'

describe('increment', () => {
  test('should none', async () => {
    await increment({
      type: IncrementType.NONE,
      platform: 'node',
      dir: jetpack.cwd('./assets').path(),
    })
  })
})
