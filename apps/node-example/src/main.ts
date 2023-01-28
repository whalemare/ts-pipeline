import { workflowApp } from './app/1. workflowApp'
import { endlessApp } from './app/2. endlessApp'
import { nestedApp } from './app/3. nestedApp'
import { deployApp } from './app/4. deployApp'
import { manualRenderApp } from './app/5. manualRenderApp'
import { workflowReactApp } from './app/workflowReactApp'

async function run() {
  const examples = {
    nestedApp,
    workflowApp,
    endlessApp,
    workflowReactApp,
    deployApp,
    manualRenderApp,
  }

  const program = examples['manualRenderApp']

  await program()
}

void run()
