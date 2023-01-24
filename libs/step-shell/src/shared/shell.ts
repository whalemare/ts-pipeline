/* eslint-disable no-console */

import { createStep } from '@ts-pipeline/core'

import { ShellOptions } from './ShellOptions'
import { execAsync } from './execAsync'

export const shell = createStep({
  name: 'shell',
  action: async (ui, command: string, options: ShellOptions) => {
    return execAsync(command, {
      ...options,
      onMessage: msg => {
        ui.onData(msg)
      },
    })
  },
})
