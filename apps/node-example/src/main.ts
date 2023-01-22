import { endlessApp } from './app/endlessApp'
import { nestedApp } from './app/nestedApp'
import { workflowApp } from './app/workflowApp'

async function run() {
  const examples = {
    nestedApp,
    workflowApp,
    endlessApp,
  }

  const program = examples['endlessApp']

  await program()
}

void run()
