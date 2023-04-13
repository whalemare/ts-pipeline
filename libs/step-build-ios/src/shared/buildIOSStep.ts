import { createStep } from '@ts-pipeline/core'

import { assertXCodeProjectExists } from '../internal/assertXCodeProjectExists'

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

    await assertXCodeProjectExists(cwd)
  },
})
