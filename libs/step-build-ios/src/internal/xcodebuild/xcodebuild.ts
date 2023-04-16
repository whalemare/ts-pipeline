import { ActionLogger, QueueOutputable } from '@ts-pipeline/core'
import { execAsync } from '@ts-pipeline/step-shell'
import { CompositeError, resolveError } from '@ts-pipeline/ts-core'
import { Optional, SolvableError } from '@ts-pipeline/ts-core'

export interface XCodeBuildProps {
  args: {
    workspace: string
    scheme: string
    sdk: string
    destination: string
    configuration: string
    derivedDataPath: string
    resultBundlePath: string
    archivePath: string
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
  const { action, args } = props
  const { logger, cwd, signal } = action

  const stringifyedArgs = Object.entries(args)
    .map(([key, value]) => `-${key} ${value}`)
    .join(' ')

  const command = `xcodebuild ${stringifyedArgs} clean build`
  logger.log(command)

  const history = new QueueOutputable<string>(100)
  try {
    await execAsync(command, {
      cwd: cwd,
      signal,
      onMessage: (message, from) => {
        if (from === 'stderr') {
          history.push(message)
          logger.error(message)
        } else {
          history.push(message)
          logger.log(message)
        }
      },
    })
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
        title: `Open XCode project and select development team in Signing & Capabilities editor
"open ${props.args.workspace}"
        `,
      },
    ])
  }

  return undefined
}
