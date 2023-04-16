import { exec, ExecOptions } from 'node:child_process'

import { ShellOptions } from './ShellOptions'

export async function execAsync(
  cmd: string,
  opts?: ExecOptions & Pick<ShellOptions, 'onMessage'>,
): Promise<string> {
  return new Promise(function (resolve, reject) {
    const listenerStdout = (data: string) => {
      opts?.onMessage?.(data, 'stdout')
    }
    const listenerStderr = (data: string) => {
      opts?.onMessage?.(data, 'stderr')
    }

    const process = exec(cmd, opts, function (exception, stdout) {
      if (opts?.onMessage) {
        process.stdout?.removeListener?.('data', listenerStdout)
        process.stderr?.removeListener?.('data', listenerStderr)
      }

      if (exception) {
        return reject(exception)
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
