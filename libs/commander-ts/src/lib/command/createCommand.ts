import { Command } from 'commander'

import { OptionComposition } from '../option/OptionData'
import { createOption } from '../option/createOption'

import { CommandData } from './CommandData'

export function createCommand<O extends OptionComposition>(program: CommandData<O>) {
  const main = new Command(program.name)
    .description(program.description || '')
    .version(program.version || '0.0.0')

  for (const subcommand of program.subcommands || []) {
    main.addCommand(createCommand(subcommand))
  }

  for (const [name, data] of Object.entries(program.options)) {
    main.addOption(createOption(name, data))
  }

  return main
}
