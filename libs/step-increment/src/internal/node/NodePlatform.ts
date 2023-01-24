import * as jetpack from 'fs-jetpack'
import * as semver from 'semver'

import { AppVersion } from '../entity/AppVersion'
import { MarketingVersion } from '../entity/MarketingVersion'
import { PlatformActions } from '../entity/PlatformActions'

export class NodePlatform implements PlatformActions {
  name = 'node'

  private get project() {
    return jetpack.cwd(this.dir)
  }

  private validateRawVersion = (raw: string): AppVersion => {
    const nativeVersion = semver.coerce(raw)?.raw
    if (!nativeVersion) {
      throw new Error(
        `Unable to parse 'version number'. Your package.json version should be declared in format like "major.minor.patch-build" ex. "1.2.3-30", but parsed as ${raw}`,
      )
    }

    const prereleaseVersion = semver.prerelease(raw)?.[0] || 1
    const buildVersion = prereleaseVersion ? Number(prereleaseVersion) : null
    if (buildVersion === null || buildVersion === undefined) {
      throw new Error(
        `Unable parse 'build' version. Your package.json version should be declared in format like "major.minor.patch-build" ex. "1.2.3-30", but parsed as ${raw}`,
      )
    }

    return {
      marketing: nativeVersion as MarketingVersion,
      build: buildVersion,
    }
  }

  private writeFullVersion = async (version: AppVersion) => {
    const path = `${this.project.cwd()}/package.json`
    const packageJson = jetpack.read(path, 'json')

    await jetpack.writeAsync(
      path,
      {
        ...packageJson,
        version: `${version.marketing}-${version.build}`,
      },
      { jsonIndent: 2 },
    )
  }

  private readVersion = async () => {
    const path = `${this.project.cwd()}/package.json`
    console.log('path', path)
    const packageJson = await jetpack.readAsync(path, 'json')
    const raw = packageJson.version
    return this.validateRawVersion(raw)
  }

  async getVersion(): Promise<MarketingVersion> {
    return (await this.readVersion()).marketing
  }

  async getBuildNumber(): Promise<number> {
    return (await this.readVersion()).build
  }

  async setVersion(newVersion: MarketingVersion): Promise<[MarketingVersion, MarketingVersion]> {
    const current = await this.readVersion()
    await this.writeFullVersion({ marketing: newVersion, build: current.build })

    return [current.marketing, newVersion]
  }

  async setBuildNumber(newBuildNumber: number): Promise<[number, number]> {
    const current = await this.readVersion()
    await this.writeFullVersion({ marketing: current.marketing, build: newBuildNumber })

    return [current.build, newBuildNumber]
  }

  constructor(private dir: string = jetpack.cwd()) {}
}
