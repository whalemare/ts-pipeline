import { execAsync } from '@ts-pipeline/step-shell'
import jetpack = require('fs-jetpack')

import { MarketingVersion } from '../entity/MarketingVersion'
import { PlatformActions } from '../entity/PlatformActions'

export class IOSPlatform implements PlatformActions {
  private iosDirectory: string

  name = 'ios'

  constructor(iosDirectory: string = jetpack.path()) {
    this.iosDirectory = iosDirectory
  }

  /**
   * Execute `xcrun agvtool new-marketing-version ${newVersion}`
   * @param newVersion your version in format `number.number.number` (ex: 1.2.3)
   */
  async setVersion(newVersion: MarketingVersion): Promise<[MarketingVersion, MarketingVersion]> {
    const oldVersion = await this.getVersion()

    await this.exec(`xcrun agvtool new-marketing-version ${newVersion}`)
    const updatedVersion = await this.getVersion()
    return [oldVersion, updatedVersion]
  }

  /**
   * Execute `xcrun agvtool next-version -all` for increment build number
   * @returns [oldBuildNumber, newBuildNumber]
   */
  async incrementBuildNumber(): Promise<[number, number]> {
    const oldBuildNumber = await this.getBuildNumber()
    await this.exec('xcrun agvtool next-version -all')
    const newBuildNumber = await this.getBuildNumber()
    return [oldBuildNumber, newBuildNumber]
  }

  /**
   * Execute `xcrun agvtool next-version -all` for increment build number
   * @returns [oldBuildNumber, newBuildNumber]
   */
  async setBuildNumber(buildNumber: number): Promise<[number, number]> {
    const oldBuildNumber = await this.getBuildNumber()
    await this.exec(`xcrun agvtool new-version -all ${buildNumber}`)

    return [oldBuildNumber, buildNumber]
  }

  /**
   * Execute `xcrun agvtool what-version` inside ios directory and get parsed result.
   * Be sure, that you enable `agvtool` for your project https://dzone.com/articles/agvtool-automating-ios-build-and-version-numbers
   */
  async getBuildNumber(): Promise<number> {
    const result = await this.exec('xcrun agvtool what-version')
    const matched = result?.match(/\d+/g)?.join()
    if (!matched) {
      throw new Error("Unable match version from output: '" + result + "'")
    }
    const buildNumber = Number.parseInt(matched)
    return buildNumber
  }

  /**
   * Execute `xcrun agvtool what-marketing-version` and parse returned value
   * @returns version name like "1.2.3"
   */
  async getVersion(): Promise<MarketingVersion> {
    const result = await this.exec('xcrun agvtool what-marketing-version')
    const phrase = 'Found CFBundleShortVersionString of "'
    const startIndex = result.indexOf(phrase)
    const endIndex = result.indexOf('"', startIndex + phrase.length + 1)
    const version = result.substring(startIndex + phrase.length, endIndex)
    return version as MarketingVersion
  }

  private exec = async (command: string) => {
    return execAsync(command, { cwd: this.iosDirectory })
  }
}
