import { MarketingVersion } from './MarketingVersion'

export interface PlatformActions {
  name: string

  getVersion(): Promise<MarketingVersion>

  setVersion(newVersion: MarketingVersion): Promise<[MarketingVersion, MarketingVersion]>

  setBuildNumber(newBuildNumber: number): Promise<[number, number]>

  getBuildNumber(): Promise<number>
}
