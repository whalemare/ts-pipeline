import { exec } from 'node:child_process'

import { ShellOptions } from './ShellOptions'

export async function execAsync(cmd: string, opts?: ShellOptions): Promise<string> {
  return new Promise(function (resolve, reject) {
    const listenerStdout = (data: string) => {
      opts?.onMessage?.(data, 'stdout')
    }
    const listenerStderr = (data: string) => {
      opts?.onMessage?.(data, 'stderr')
    }

    const process = exec(cmd, opts, function (code, stdout, stderr) {
      if (opts?.onMessage) {
        process.stdout?.removeListener?.('data', listenerStdout)
        process.stderr?.removeListener?.('data', listenerStderr)
      }

      if (code) {
        return reject(new Error(stderr.toString()))
      }
      return resolve(stdout.toString())
    })

    // process.addListener('error', err => {
    //   console.error('err', err)
    // })
    // process.addListener('close', code => {
    //   console.error('close', code)
    // })
    // process.addListener('exit', code => {
    //   console.error('exit', code)
    // })
    // process.stderr?.on('data', data => {
    //   console.log('stderr data', data)
    // })

    if (opts?.onMessage) {
      process.stdout?.on('data', listenerStdout)
      process.stderr?.on('data', listenerStderr)
    }
  })
}
