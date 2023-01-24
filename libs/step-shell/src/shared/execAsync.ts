import { exec } from 'node:child_process'

import { ShellOptions } from './ShellOptions'

export async function execAsync(cmd: string, opts?: ShellOptions): Promise<string> {
  return new Promise(function (resolve, reject) {
    const process = exec(cmd, opts, function (code, stdout, stderr) {
      if (code) {
        return reject(new Error(stderr.toString()))
      }
      return resolve(stdout.toString())
    })

    // process.addListener('error', err => {
    // console.error('err', err)
    // })
    // process.addListener('close', code => {
    // console.error('close', code)
    // })
    // process.addListener('exit', code => {
    // console.error('exit', code)
    // })

    if (opts?.onMessage) {
      process.stdout?.on('data', data => {
        opts?.onMessage?.(data)
      })
    }
  })
}
