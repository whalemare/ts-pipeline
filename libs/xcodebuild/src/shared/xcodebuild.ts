import type { ActionLogger } from '@ts-pipeline/core'
import { execAsync } from '@ts-pipeline/step-shell'
import {
  CompositeError,
  QueueOutputable,
  resolveError,
  SolvableError,
  type Optional,
} from '@ts-pipeline/ts-core'

export interface XCodeBuildProps {
  /**
   * Root directory for "xcodebuild" command
   */
  cwd?: string

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

  options: {
    archivePath?: string
    workspace?: string
    scheme?: string
    sdk?: string
    destination?: string
    configuration?: string
    resultBundlePath?: string
    derivedDataPath?: string
    exportPath?: string
    exportOptionsPlist?: boolean
    allowProvisioningUpdates?: boolean
    exportArchive?: boolean
  }

  /**
   * You can just pass action from step
   */
  action?: Partial<{
    logger: ActionLogger
    signal: AbortSignal
  }>
}

export async function xcodebuild(props: XCodeBuildProps) {
  const { action, options: args, clean = true, loud = false, cwd } = props
  const { logger, signal } = action || {}

  if (loud && !logger) {
    console.warn('"loud" flag is set, but "logger" is not passed, so we will not log anything')
  }

  const stringifyedArgs = Object.entries(args)
    .map(([key, value]) => {
      if (value === undefined) {
        return ''
      } else if (value === true) {
        return `-${key}`
      } else if (value === false) {
        return ''
      }

      return `-${key} ${value}`
    })
    .join(' ')
    .trim()

  let command = `xcodebuild ${stringifyedArgs}`
  if (!loud) {
    command += ' -quiet'
  }
  if (clean) {
    command += ' clean'
  }
  command += ' archive'

  logger?.log(command)

  // used for future error parsing
  const history = new QueueOutputable<string>(100)
  let skippedLogs = 0
  let intervalId: NodeJS.Timeout | undefined = undefined

  if (!loud) {
    logger?.log(
      'xcodebuild output is hidden, use `loud` flag to see it. We will print skipped logs count every 5 seconds to be sure that it is not stuck.',
    )

    if (logger) {
      intervalId = setInterval(() => {
        printSkippedCount(logger, skippedLogs)
      }, 5000)
    }
  }

  try {
    await execAsync(command, {
      cwd: cwd,
      signal,
      onMessage: (message, from) => {
        if (from === 'stderr') {
          history.push(message)
          if (loud) {
            logger?.error(message)
          } else {
            skippedLogs++
          }
        } else {
          history.push(message)
          if (loud) {
            logger?.log(message)
          } else {
            skippedLogs++
          }
        }
      },

      // xcodebuild can produce huge output
      maxBuffer: Infinity,
    })

    if (logger) {
      printSkippedCount(logger, skippedLogs)
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
  } finally {
    clearInterval(intervalId)
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
        command: `open ${props.options.workspace}`,
      },
    ])
  } else if (text.includes('error: Existing file at -resultBundlePath ')) {
    return new SolvableError('Result bundle already exists in cache', [
      {
        title: `Remove existing result bundle from cache, to make XCode build new one`,
        command: `rm -rf ${props.options.resultBundlePath}`,
      },
    ])
  }

  return undefined
}

function printSkippedCount(logger: ActionLogger, count: number) {
  if (count) {
    logger.log(`Skipped ${count} logs from xcodebuild`)
  }
}
