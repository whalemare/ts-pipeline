import { getRegistry } from '../../internal/registry/getRegistry'
import { TerminalRenderStore } from '../../internal/renderer/terminal/TerminalRenderStore'
import { TerminalRenderers } from '../../internal/renderer/terminal/TerminalRenderers'
import { TaskStringRenderable } from '../../internal/task/renderable/TaskStringRenderable'

const renderers: TerminalRenderers = {
  task: new TaskStringRenderable(),
}

export const rendererInstance = new TerminalRenderStore(getRegistry(), renderers)
// export const rendererInstance = new ReactAppRender()
