/* eslint-disable @typescript-eslint/no-explicit-any */
import { OptionComposition } from '../option/OptionData'

export interface CommandData<O extends OptionComposition = any> {
  name: string
  description?: string
  version?: string
  subcommands?: CommandData[]
  options: O
}
