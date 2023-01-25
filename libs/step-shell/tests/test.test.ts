import { overrideRegistry } from '@ts-pipeline/core'
import { PipelineRegistryStore } from '@ts-pipeline/core'

import { shell } from '../src/shared/shell'

test('shell should cancel when main cancel', async () => {
  const main = jest.fn()
  const registry = new PipelineRegistryStore({ fn: main, name: 'test' })
  overrideRegistry(registry)

  setTimeout(() => {
    registry.tasks.forEach(task => task.request.cancel())
  }, 1)

  await expect(shell('sleep 10')).rejects.toBeTruthy()

  // timeout 1 sec, test will success of fail on timeout
}, 1000)
