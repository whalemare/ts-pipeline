import { createStep } from '@ts-pipeline/core'

import { assertXCodeWorkspaceExists } from '../internal/assertXCodeWorkspaceExists'
import { expectCliCommandExists } from '../internal/expectCliCommandExists'

interface BuildIOSStepProps {
  /**
   * Path to the folder containing the .xcworspace XCode project
   *
   * @default process.cwd()
   */
  cwd?: string
}

export const buildIOSStep = createStep({
  name: 'build-ios',
  action: async (ui, { cwd = process.cwd() }: BuildIOSStepProps) => {
    ui.onData(`Start building iOS app in ${cwd}`)

    const { projectName, xcworkspacePath } = await assertXCodeWorkspaceExists(cwd)
    await expectCliCommandExists(`xcodebuild`, [
      {
        title: `Maybe you not on macOS?`,
      },
    ])

    console.log('projectName', projectName)
    console.log('xcworkspacePath', xcworkspacePath)

    // cd ../../apps/mobile-client/ios && xcodebuild -workspace hadam.xcworkspace -scheme Hadam -configuration Debug -sdk iphonesimulator -destination 'platform=iOS Simulator,name=iPhone 14' -derivedDataPath ./build -quiet
  },
})
