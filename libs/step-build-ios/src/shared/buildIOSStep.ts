import { createStep } from '@ts-pipeline/core'
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
    ui,
    { cwd = process.cwd(), scheme, configuration = 'Release' }: BuildIOSStepProps,
  ) => {
    const project = jetpack.cwd(cwd)
    ui.onData(`Start building iOS app in ${project.path()}`)

    await expectCliCommandExists(`xcodebuild`, [
      {
        title: `Maybe you not on macOS?`,
      },
    ])
    const { xcworkspaceName, xcworkspacePath } = await assertXCodeWorkspaceExists(cwd)

    // check connected physical iOS devices and show warning message when has at least one with bash
    // execAsync(`xcrun instruments -s devices | grep -E 'iPhone|iPad'`)
    await warnAboutConnectedPhysicalDevices(ui)

    // TODO: add parsing of .xcworkspace file to get scheme name when it not in cli args
    const normalizedScheme = scheme || xcworkspaceName

    ui.onData(`Detected XCode workspace: ${xcworkspaceName}.xcworkspace`)

    const bundlePath = project.path('./build/artifacts/BUNDLE_NAME_TODO')
    if (project.exists(bundlePath)) {
      ui.onData(
        `Remove old build artifacts at path "${bundlePath}", otherwise xcodebuild will fail`,
      )
      await project.removeAsync(bundlePath)
    }

    const args = {
      workspace: xcworkspacePath,
      scheme: normalizedScheme,
      sdk: 'iphoneos',
      destination: 'generic/platform=iOS',
      configuration: configuration || 'Debug',
      derivedDataPath: project.path('./build/DerivedData'),
      resultBundlePath: project.path('./build/artifacts/BUNDLE_NAME_TODO'), // ! TODO
      archivePath: project.path('./build/artifacts/ARCHIVE_NAME_TODO.xcarchive'), // ! TODO
    }
    const stringifyedArgs = Object.entries(args)
      .map(([key, value]) => `-${key} ${value}`)
      .join(' ')

    const command = `xcodebuild ${stringifyedArgs} clean build`
    ui.onData(command)

    // await execAsync(command, { cwd: cwd, signal: ui.signal })
  },
})
