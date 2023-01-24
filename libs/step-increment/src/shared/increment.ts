import { createStep } from '@ts-pipeline/core'
import { Optional } from '@ts-pipeline/ts-core'
import * as jetpack from 'fs-jetpack'
import { inc } from 'semver'

import { AndroidPlatform } from '../internal/android/AndroidPlatform'
import { AppVersion } from '../internal/entity/AppVersion'
import { MarketingVersion } from '../internal/entity/MarketingVersion'
import { NodePlatform } from '../internal/node/NodePlatform'

import { IncrementType } from './IncrementType'

interface IncrementProps {
  dir?: string

  /**
   * @default 'none'
   */
  type?: IncrementType
  platform: 'ios' | 'android' | 'node'
}

const platformToInteractor = {
  ios: (dir?: string) => {
    throw new Error('Not implemented')
  },
  android: (dir?: string) => {
    return new AndroidPlatform(dir)
  },
  node: (dir?: string) => {
    return new NodePlatform(dir)
  },
}

export const increment = createStep({
  name: 'increment',
  action: async (ui, props: IncrementProps) => {
    const { platform, dir = jetpack.cwd(), type = IncrementType.NONE } = props
    ui.onData('Working at path: ' + dir)

    const interactor = platformToInteractor[platform](dir)
    const build = await interactor.getBuildNumber()
    const version = await interactor.getVersion()

    const prev: AppVersion = {
      build: build,
      marketing: version,
    }

    if (type === IncrementType.NONE) {
      ui.onData("Increment type is 'none', skipping")

      return [prev, prev]
    }

    const nextBuild = build + 1
    if (type === IncrementType.BUILD) {
      await interactor.setBuildNumber(nextBuild)
      await interactor.setVersion(version)
      return [
        prev,
        {
          build: nextBuild,
          marketing: version,
        },
      ]
    }

    const nextVersion = inc(version, type) as Optional<MarketingVersion>
    if (!nextVersion) {
      throw new Error(`Invalid version ${version} for type ${type}`)
    }

    const current: AppVersion = {
      build: nextBuild,
      marketing: nextVersion,
    }
    return [prev, current]
  },
})