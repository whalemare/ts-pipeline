import { createProgram } from '@ts-pipeline/commander-ts'
import { getKeys } from '@ts-pipeline/ts-core'

import { workflowApp } from './app/1. workflowApp'
import { errorablesApp } from './app/10. errorablesApp'
import { renderToConsoleApp } from './app/11. renderToConsole'
import { endlessApp } from './app/2. endlessApp'
import { nestedApp } from './app/3. nestedApp'
import { deployApp } from './app/4. deployApp'
import { manualRenderApp } from './app/5. manualRenderApp'
import { pipelineApp } from './app/6. pipelineApp'
import { parallelApp } from './app/7. parallelApp'
import { complexApp } from './app/8. complexApp'
import { ddosStdout } from './app/9. ddosStdout'
import { workflowReactApp } from './app/workflowReactApp'

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
  errorablesApp,
  renderToConsoleApp,
}

const names = getKeys(examples)

createProgram(
  {
    name: 'node-example',
    description: 'List of examples for ts-pipeline',
    options: {
      name: {
        type: 'string',
        char: 'n',
        description: 'Name of example to run',
        default: 'nestedApp',
        choices: names,
      },
    },
  },
  async ({ name }) => {
    if (name && names.includes(name as keyof typeof examples)) {
      await examples[name as keyof typeof examples]()
    } else {
      await examples[names[0]]()
    }
  },
).parse()
