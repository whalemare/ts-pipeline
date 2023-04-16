import { ActionLogger } from '@ts-pipeline/core'
import { execAsync } from '@ts-pipeline/step-shell'

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
  logger?.log(command)

  await execAsync(command, {
    cwd: cwd,
    signal,
    onMessage: (message, from) => {
      if (from === 'stderr') {
        logger.error(message)
      } else {
        logger.log(message)
      }
    },
  })
}
