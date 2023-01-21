/* eslint-disable no-console */
import { exec } from 'node:child_process'

import { createStep } from '@ts-pipeline/core'

async function execAsync(cmd: string, opts?: ShellOptions): Promise<string> {
  return new Promise(function (resolve, reject) {
    const process = exec(cmd, { cwd: opts?.cwd }, function (code, stdout, stderr) {
      if (code) {
        return reject(new Error(stderr))
      }
      return resolve(stdout)
    })

    process.addListener('message', (message, handle) => {
      console.log('message', message, handle)
    })
    process.addListener('error', err => {
      console.error('err', err)
    })
    process.addListener('close', code => {
      console.error('close', code)
    })
    process.addListener('exit', code => {
      console.error('exit', code)
    })

    if (opts?.onMessage) {
      process.stdout?.on('data', data => {
        opts?.onMessage?.(data)
      })
    }
  })
}

interface ShellOptions {
  cwd?: string
  onMessage?: (message: string) => void
}

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
