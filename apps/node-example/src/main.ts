import { deployApp } from './app/deployApp'
import { endlessApp } from './app/endlessApp'
import { nestedApp } from './app/nestedApp'
import { workflowApp } from './app/workflowApp'
import { workflowReactApp } from './app/workflowReactApp'

async function run() {
  const examples = {
    nestedApp,
    workflowApp,
    endlessApp,
    workflowReactApp,
    deployApp,
  }

  const program = examples['deployApp']

  await program()
}

void run()
