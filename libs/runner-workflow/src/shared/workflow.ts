import { overrideRegistry } from '@ts-pipeline/core'
import { AppRender } from '@ts-pipeline/renderer-core'
import { ReactIncRender } from '@ts-pipeline/renderer-react-ink'
import { SequenceRunnerStore } from '@ts-pipeline/runner-sequence'

interface WorkflowProps {
  name?: string
  renderer?: AppRender
}

/**
 * You can use it like a 'white paper' for your steps.
 *
 * Write any kind of logic by using whole power of typescript.
 *
 * Limitations: all your steps will be displayed as serial chain, without nesting, even when it is.
 */
export const workflow = async <R>(func: () => Promise<R>, props?: WorkflowProps) => {
  const registry = new SequenceRunnerStore<void, R>([
    {
      name: props?.name ?? 'workflow',
      action: func,
    },
  ])
  overrideRegistry(registry)

  const app: AppRender = props?.renderer ? props.renderer : new ReactIncRender()
  const finishRender = app.render(registry)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await registry.request.fetch(undefined as any)

  finishRender()
  process.exit(0)
}