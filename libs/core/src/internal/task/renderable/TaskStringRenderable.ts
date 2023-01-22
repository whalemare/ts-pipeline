import chalk from 'chalk'
import { makeAutoObservable } from 'mobx'

import { Renderable } from '../../renderer/Renderable'
import { TaskStore } from '../TaskStore'
export class TaskStringRenderable implements Renderable<TaskStore, string> {
  render = (item: TaskStore<any, any>, frame: number): string => {
    const title = chalk.bold(item.name)
    let result = ''
    let prefix = ''
    let percent = ''

    if (item.request.isSuccess) {
      percent = ''
      prefix = '✅'
      result = chalk.green(JSON.stringify(item.request.value))
    } else if (item.request.isLoading) {
      prefix = frames[frame % frames.length]
    } else {
      prefix = ''
    }

    if (item.request.progress !== 0 && item.request.progress !== 1) {
      percent = chalk.dim(`${Math.round(item.request.progress * 100)}%`)
    }

    if (item.request.error) {
      prefix = '❌'
      result = chalk.red(
        item.request.error.toString?.() ?? (JSON.stringify(item.request.error) || 'unknown error'),
      )
    }

    const args = item.args ? chalk.dim(`(${item.args.join(', ')})`) : ''
    const history = chalk.dim(item.history.items.map(it => `    -> ${it}`).join('\n'))

    return `${prefix} ${title}${args} ${percent}${result}\n${history}`
  }

  constructor() {
    makeAutoObservable(this)
  }
}

const frames = ['▏', '▎', '▍', '▌', '▋', '▊', '▉', '▊', '▋', '▌', '▍', '▎']