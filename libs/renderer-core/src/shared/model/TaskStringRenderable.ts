import { TaskStore } from '@ts-pipeline/core'
import { makeAutoObservable } from 'mobx'

export class TaskStringRenderable {
  render = (item: TaskStore, frame: number): string => {
    const title = item.name
    let result = ''
    let prefix = ''
    let percent = ''

    if (item.request.isSuccess) {
      percent = ''
      prefix = '✅'
      result = JSON.stringify(item.request.value)
    } else if (item.request.isLoading) {
      prefix = frames[frame % frames.length]
    } else {
      prefix = ''
    }

    if (item.request.progress !== 0 && item.request.progress !== 1) {
      percent = `${Math.round(item.request.progress * 100)}%`
    }

    if (item.request.error) {
      prefix = '❌'
      result =
        item.request.error.toString?.() ?? (JSON.stringify(item.request.error) || 'unknown error')
    }

    const args = '*skip args printing*'
    const history = item.history.map(it => `    -> ${it}`).join('\n')

    return `${prefix} ${title}${args} ${percent}${result}\n${history}`
  }

  constructor() {
    makeAutoObservable(this)
  }
}

const frames = ['▏', '▎', '▍', '▌', '▋', '▊', '▉', '▊', '▋', '▌', '▍', '▎']
