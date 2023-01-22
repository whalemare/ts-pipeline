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
  }

  const program = examples['endlessApp']

  await program()
}

void run()
