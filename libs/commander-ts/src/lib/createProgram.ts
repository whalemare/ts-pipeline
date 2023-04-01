/* eslint-disable @typescript-eslint/no-explicit-any */
import { Optional } from '@ts-pipeline/ts-core'

import { CommandData } from './command/CommandData'
import { createCommand } from './command/createCommand'
import { OptionComposition } from './option/OptionData'
import { StringedType } from './option/StringedType'

type RequiredOrOptional<T, R> = R extends true ? T : Optional<T>

// TODO: add arrays
type StringToType<
  ST extends StringedType,
  Required extends Optional<boolean> = false,
> = ST extends 'boolean'
  ? RequiredOrOptional<boolean, Required>
  : ST extends 'string'
  ? RequiredOrOptional<string, Required>
  : ST extends 'number'
  ? RequiredOrOptional<number, Required>
  : never

type MapOptionDataToOption<O extends OptionComposition> = {
  [K in keyof O]: StringToType<O[K]['type'], O[K]['required']>
}

type Program<O extends OptionComposition = any> = CommandData<O>

export function createProgram<O extends OptionComposition, P extends Program<O>>(
  program: P,
  run: (options: MapOptionDataToOption<P['options']>) => Promise<void>,
) {
  const command = createCommand(program)
  command.action(run)
  return command
}
