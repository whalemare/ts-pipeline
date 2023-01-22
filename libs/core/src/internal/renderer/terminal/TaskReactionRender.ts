import { TaskStore } from '@ts-pipeline/task'
import { Unsubscriber } from '@ts-pipeline/ts-core'
import chalk from 'chalk'
import {
  computed,
  makeObservable,
  observable,
  onBecomeObserved,
  onBecomeUnobserved,
  reaction,
  runInAction,
} from 'mobx'

const frames = ['▏', '▎', '▍', '▌', '▋', '▊', '▉', '▊', '▋', '▌', '▍', '▎']

export class TaskReactionRender {
  @observable
  private frame = 0

  @computed
  get line() {
    const item = this.item

    const title = chalk.bold(item.name)
    let result = ''
    let prefix = ''
    let percent = ''

    if (item.request.isSuccess) {
      percent = ''
      prefix = '✅'
      result = chalk.green(JSON.stringify(item.request.value))
    } else if (item.request.isLoading) {
      prefix = frames[this.frame % frames.length]
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

  constructor(private item: TaskStore) {
    makeObservable(this)

    let unsubscribe: Unsubscriber
    let interval: NodeJS.Timeout

    const clear = () => {
      if (interval) {
        clearInterval(interval)
      }

      if (unsubscribe) {
        unsubscribe()
      }
    }

    onBecomeUnobserved(this, 'line', clear)
    onBecomeObserved(this, 'line', () => {
      unsubscribe = reaction(
        () => this.item.request.isLoading,
        loading => {
          if (loading) {
            interval = setInterval(() => {
              console.log('onBecomeObserved')

              runInAction(() => {
                this.frame++
              })
            }, 80)
          } else {
            clear()
          }
        },
      )
    })
  }
}
