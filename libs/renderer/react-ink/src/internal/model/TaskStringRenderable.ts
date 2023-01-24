// any required for autotypings
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Renderable } from '@ts-pipeline/renderer/core'
import { TaskStore } from '@ts-pipeline/task'
import chalk from 'chalk'
import { makeAutoObservable } from 'mobx'

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

    const args = item.args
      ? chalk.dim(
          `(${item.args
            .map((arg: unknown) => {
              if (typeof arg === 'object') {
                return JSON.stringify(arg)
              }

              return arg
            })
            .join(', ')})`,
        )
      : ''
    const history = chalk.dim(item.history.items.map(it => `    -> ${it}`).join('\n'))

    return `${prefix} ${title}${args} ${percent}${result}\n${history}`
  }

  constructor() {
    makeAutoObservable(this)
  }
}

const frames = ['▏', '▎', '▍', '▌', '▋', '▊', '▉', '▊', '▋', '▌', '▍', '▎']
