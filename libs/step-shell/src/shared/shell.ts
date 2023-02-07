import { createStep } from '@ts-pipeline/core'

import { ShellOptions } from './ShellOptions'
import { execAsync } from './execAsync'

export interface ShellProps {
  command: string
  options?: ShellOptions
}
export const shell = createStep({
  name: 'shell',
  historySize: 5,
  action: async (ui, props: ShellProps) => {
    await execAsync(props.command, {
      ...props.options,
      signal: ui.signal,
      onMessage: msg => {
        ui.onData(msg)
      },
    })
  },
})
