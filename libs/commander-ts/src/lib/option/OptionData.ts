/* eslint-disable @typescript-eslint/no-explicit-any */
import { LowecaseChar } from './LowecaseChar'
import { StringedType } from './StringedType'

type UppercaseChar = Uppercase<LowecaseChar>
export type Char = LowecaseChar | UppercaseChar

export interface OptionData<V = any> {
  type: StringedType
  char?: Char
  description?: string
  required?: boolean
  default?: V

  /**
   * Allow only the given choices
   */
  choices?: string[]
}

export type OptionComposition<N extends string = string, V = any> = {
  [key in N]: OptionData<V>
}
