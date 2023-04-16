import { ActionLogger, QueueOutputable } from '@ts-pipeline/core'
import { execAsync } from '@ts-pipeline/step-shell'
import { CompositeError, resolveError } from '@ts-pipeline/ts-core'

import { findErrorInText } from './findErrorInText'

export interface XCodeBuildProps {
  // workspace: xcworkspacePath,
  // scheme: normalizedScheme,
  // sdk: 'iphoneos',
  // destination: 'generic/platform=iOS',
  // configuration: configuration || 'Debug',
  // derivedDataPath: project.path('./build/DerivedData'),
  // resultBundlePath: project.path('./build/artifacts/BUNDLE_NAME_TODO'), // ! TODO
  // archivePath: project.path('./build/artifacts/ARCHIVE_NAME_TODO.xcarchive'), // ! TODO

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

export async function xcodebuild({ action, args }: XCodeBuildProps) {
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
      const error = findErrorInText(next)
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
