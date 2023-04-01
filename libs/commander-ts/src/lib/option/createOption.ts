/* eslint-disable @typescript-eslint/no-explicit-any */
import { Option } from 'commander'

import { OptionData } from './OptionData'

function createPostfix(data: OptionData) {
  if (data.type === 'boolean') {
    return ''
  } else if (data.type === 'string' || data.type === 'number') {
    return `<${data.type}>`
  }
  // TODO: add arrays

  return ''
}

export function createOption<N extends string, V = any>(name: N, data: OptionData<V>) {
  let totalName = ''
  if (name && data.char) {
    totalName = `-${data.char}, --${name}`
  } else if (name) {
    totalName = `--${name}`
  }

  totalName = `${totalName} ${createPostfix(data)}`.trim()

  const option = new Option(totalName, data.description || '')
  option.makeOptionMandatory(data.required ?? false)

  if (data.default) {
    option.default(data.default)
  }

  if (data.choices) {
    option.choices(data.choices)
  }

  return option
}
