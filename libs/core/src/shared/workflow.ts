import { PipelineRegistryStore } from '../internal/registry/PipelineRegistryStore'
import { overrideRegistry } from '../internal/registry/getRegistry'
import { TerminalRenderStore } from '../internal/renderer/terminal/TerminalRenderStore'

import { AppRender } from './AppRender'

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
  const registry = new PipelineRegistryStore({
    name: props?.name ?? 'workflow',
    fn: func,
  })
  overrideRegistry(registry)

  const app: AppRender = props?.renderer ? props.renderer : new TerminalRenderStore(registry)
  const finishRender = app.render()

  await registry.workflowTask.request.fetch([])

  finishRender()
  process.exit(0)
}
