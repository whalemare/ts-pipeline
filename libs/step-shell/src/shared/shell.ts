import { createStep } from '@ts-pipeline/core'

import { ShellOptions } from './ShellOptions'
import { execAsync } from './execAsync'

export interface ShellProps {
  command: string
  options?: ShellOptions
}
export const shell = createStep({
  name: 'shell',
  action: async (ui, props: ShellProps) => {
    return execAsync(props.command, {
      ...props.options,
      signal: ui.signal,
      onMessage: (msg, source) => {
        ui.onData(`${source}: ${msg}`)
      },
    })
  },
})
