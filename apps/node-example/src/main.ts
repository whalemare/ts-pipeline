import { workflowApp } from './app/1. workflowApp'
import { endlessApp } from './app/2. endlessApp'
import { nestedApp } from './app/3. nestedApp'
import { deployApp } from './app/4. deployApp'
import { manualRenderApp } from './app/5. manualRenderApp'
import { pipelineApp } from './app/6. pipelineApp'
import { parallelApp } from './app/7. parallelApp'
import { complexApp } from './app/8. complexApp'
import { ddosStdout } from './app/9. ddosStdout'
import { workflowReactApp } from './app/workflowReactApp'

async function run() {
  const examples = {
    nestedApp,
    workflowApp,
    endlessApp,
    workflowReactApp,
    deployApp,
    manualRenderApp,
    pipelineApp,
    parallelApp,
    complexApp,
    ddosStdout,
  }

  const program = examples['ddosStdout']

  await program()
}

void run()
