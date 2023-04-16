import { createStep } from '@ts-pipeline/core'
import { xcodebuild } from '@ts-pipeline/xcodebuild'
import jetpack = require('fs-jetpack')

import { assertXCodeWorkspaceExists } from '../internal/assertXCodeWorkspaceExists'
import { expectCliCommandExists } from '../internal/expectCliCommandExists'
import { warnAboutConnectedPhysicalDevices } from '../internal/warnAboutConnectedPhysicalDevices'

interface BuildIOSStepProps {
  /**
   * Path to the folder containing the .xcworspace XCode project
   *
   * @default process.cwd()
   */
  cwd?: string

  /**
   * @default 'Release'
   */
  configuration?: 'Debug' | 'Release'

  /**
   * @default name in parsed {NAME}.xcworkspace
   */
  scheme?: string
}

export const buildIOSStep = createStep({
  name: 'build-ios',
  action: async (
    { logger, signal },
    { cwd = process.cwd(), scheme, configuration = 'Release' }: BuildIOSStepProps,
  ) => {
    const project = jetpack.cwd(cwd)
    logger.log(`Start building iOS app in ${project.path()}`)

    await expectCliCommandExists(`xcodebuild`, [
      {
        title: `Maybe you not on macOS?`,
      },
    ])
    const { xcworkspaceName, xcworkspacePath } = await assertXCodeWorkspaceExists(cwd)

    // check connected physical iOS devices and show warning message when has at least one with bash
    // execAsync(`xcrun instruments -s devices | grep -E 'iPhone|iPad'`)
    await warnAboutConnectedPhysicalDevices(logger)

    // TODO: add parsing of .xcworkspace file to get scheme name when it not in cli args
    const normalizedScheme = scheme || xcworkspaceName

    logger.log(`Detected XCode workspace: ${xcworkspaceName}.xcworkspace`)

    const artifactsDir = project.path('./build/artifacts')
    if (project.exists(artifactsDir)) {
      logger.log(
        `Remove old build artifacts at path "${artifactsDir}", otherwise xcodebuild will fail`,
      )
      await project.removeAsync(artifactsDir)
    }

    const archivePath = project.path(artifactsDir, 'archive.xcarchive')
    await xcodebuild({
      cwd,

      options: {
        workspace: xcworkspacePath,
        scheme: normalizedScheme,
        sdk: 'iphoneos',
        destination: '"generic/platform=iOS"',
        configuration: configuration || 'Debug',
        resultBundlePath: project.path(artifactsDir, 'bundle'),
        archivePath,
      },

      action: {
        logger,
        signal,
      },
    })

    logger.log('Archive iOS app successfully. Start exporting IPA file')
  },
})
