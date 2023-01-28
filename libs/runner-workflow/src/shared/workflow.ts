import { overrideRegistry } from '@ts-pipeline/core'
import { AppRender } from '@ts-pipeline/renderer-core'
import { ReactInkRender } from '@ts-pipeline/renderer-react-ink'
import { sequence } from '@ts-pipeline/runner-sequence'

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
  const registry = sequence({
    name: props?.name ?? 'workflow',
    action: func,
  })
  overrideRegistry(registry)

  const app: AppRender = props?.renderer ? props.renderer : new ReactInkRender()
  const finishRender = app.render(registry)

  await registry.run(void 0)

  finishRender()
  process.exit(0)
}
