import { workflow } from '@ts-pipeline/core'
import { overrideRegistry } from '@ts-pipeline/core'
import { PipelineRegistryStore } from '@ts-pipeline/core'
import { shell } from '@ts-pipeline/step-shell'
import { stdin } from 'mock-stdin'

test('should cancel when ctrl+c', async () => {
  const mocked = stdin()

  setTimeout(() => {
    mocked.send('\x03')
  }, 2000)

  await expect(
    workflow(async () => {
      await shell('sleep 10')
    }),
  ).rejects.toBeTruthy()
})

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
