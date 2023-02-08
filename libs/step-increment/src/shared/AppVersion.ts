import { MarketingVersion } from '../internal/entity/MarketingVersion'

export interface AppVersion {
  marketing: MarketingVersion
  build: number
}
