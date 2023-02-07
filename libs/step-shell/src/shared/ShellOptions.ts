import type { ExecOptions } from 'child_process'

export interface ShellOptions extends Omit<ExecOptions, 'signal'> {
  cwd?: string
  onMessage?: (message: string, from: 'stdout' | 'stderr') => void
}
