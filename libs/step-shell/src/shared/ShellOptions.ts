import type { ExecOptions } from 'child_process'

export interface ShellOptions extends ExecOptions {
  cwd?: string
  onMessage?: (message: string) => void
}
