import { ActionLogger, QueueOutputable } from '@ts-pipeline/core'
import { execAsync } from '@ts-pipeline/step-shell'
import { CompositeError, resolveError } from '@ts-pipeline/ts-core'
import { Optional, SolvableError } from '@ts-pipeline/ts-core'

export interface XCodeBuildProps {
  /**
   * Clean before build
   * @default true
   */
  clean?: boolean

  /**
   * xcodebuild has `-quiet` flag that can be used to reduce output, but anyway it always huge.
   *
   * So we introduce new flag `loud` that additionally to `-quiet` also doesn't log anything from xcodebuild output.
   *
   * @default false
   */
  loud?: boolean

  args: {
    workspace: string
    scheme: string
    sdk: string
    destination: string
    configuration: string
    resultBundlePath: string
    archivePath: string

    derivedDataPath?: string
  }

  /**
   * You can just pass action from step
   */
  action: {
    logger: ActionLogger
    signal: AbortSignal
    cwd: string
  }
}

export async function xcodebuild(props: XCodeBuildProps) {
  const { action, args, clean = true, loud = false } = props
  const { logger, cwd, signal } = action

  const stringifyedArgs = Object.entries(args)
    .map(([key, value]) => `-${key} ${value}`)
    .join(' ')

  let command = `xcodebuild ${stringifyedArgs}`
  if (!loud) {
    command += ' -quiet'
  }
  if (clean) {
    command += ' clean'
  }
  command += ' archive'

  logger.log(command)

  // used for future error parsing
  const history = new QueueOutputable<string>(100)
  let skippedLogs = 0
  try {
    await execAsync(command, {
      cwd: cwd,
      signal,
      onMessage: (message, from) => {
        if (from === 'stderr') {
          history.push(message)
          if (loud) {
            logger.error(message)
            skippedLogs++
          }
        } else {
          history.push(message)
          if (loud) {
            logger.log(message)
            skippedLogs++
          }
        }
      },

      // xcodebuild can produce huge output
      maxBuffer: Infinity,
    })

    if (skippedLogs) {
      let msg = `Skipped ${skippedLogs} logs from xcodebuild`
      if (loud) {
        // if loud is true, then we already logged all logs
      } else {
        msg += ` with passed "-quiet" option :). Pass "loud" flag to see all logs`
      }

      logger.log(msg)
    }
  } catch (e) {
    const errors = [resolveError(e)]

    const parsedErrors = history.items.reduce((total, next) => {
      const error = findErrorInText(next, props)
      if (error) {
        total.push(error)
      }
      return total
    }, [] as Error[])

    errors.push(...parsedErrors)

    if (errors.length > 1) {
      throw new CompositeError(errors)
    } else if (errors.length === 1) {
      throw errors[0]
    } else {
      throw resolveError(e)
    }
  }
}

function findErrorInText(text: string, props: XCodeBuildProps): Optional<Error> {
  if (
    text.includes(
      " requires a development team. Select a development team in the Signing & Capabilities editor. (in target '",
    )
  ) {
    return new SolvableError('Missing development team', [
      {
        title: `Open XCode project and select development team in Signing & Capabilities editor`,
        command: `open ${props.args.workspace}`,
      },
    ])
  } else if (text.includes('error: Existing file at -resultBundlePath ')) {
    return new SolvableError('Result bundle already exists in cache', [
      {
        title: `Remove existing result bundle from cache, to make XCode build new one`,
        command: `rm -rf ${props.args.resultBundlePath}`,
      },
    ])
  }

  return undefined
}
