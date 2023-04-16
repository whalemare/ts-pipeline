/* eslint-disable no-console */
import { Registry, TaskStore } from '@ts-pipeline/core'
import { RootTaskStore } from '@ts-pipeline/runner-sequence'
import { composeSubscribe, Unsubscriber } from '@ts-pipeline/ts-core'
import { reaction } from 'mobx'

import { AppRender } from '../entity/AppRender'

import { colors } from './colors'

export class PlainConsoleRender implements AppRender {
  private createReaction = (store: TaskStore) => {
    return composeSubscribe([
      reaction(
        () => {
          const title = store.name
          let result = ''
          let prefix = ''
          let percent = ''

          if (store.request.isSuccess === undefined) {
            prefix = '✨'
            percent = ''
            result = JSON.stringify(store.request.value)
          } else if (store.request.isSuccess) {
            percent = ''
            prefix = '✅'
            result = JSON.stringify(store.request.value)
          } else if (store.request.isLoading) {
            prefix = `⚒`
          } else {
            prefix = ''
          }

          if (store.request.progress !== 0 && store.request.progress !== 1) {
            percent = getProgress(store)
          }

          if (store.request.error) {
            prefix = '❌'
            result =
              store.request.error.toString?.() ??
              (JSON.stringify(store.request.error) || 'unknown error')
          }

          const history = store.history.slice()

          return { prefix, title, percent, history, result }
        },
        (data, old) => {
          const { title, percent, prefix, history, result } = data

          let output = `${prefix}[${title}] ${percent}`
          const deltaHistory = history.slice(old.history.length)
          if (result !== old.result) {
            output += `\n               ${result}`
          }
          if (deltaHistory.length > 0) {
            output += `\n               ${deltaHistory
              .map(it => {
                let colorized = (text: string) => text

                switch (it.type) {
                  case 'warn':
                    colorized = colors.yellow
                    break
                  case 'error':
                    colorized = colors.red
                    break
                  default:
                    colorized = (text: string) => text
                    break
                }

                return colorized(toStringSafe(it.value))
              })
              .join('\n')}`
          }

          printLine(output)
        },
      ),
    ])
  }

  render = (registry: Registry<unknown, unknown>): Unsubscriber => {
    console.log('PlainConsoleRender.render()')
    console.log('Tasks count = ', registry.nested.length)
    console.log(
      registry.nested.map(it => {
        return `${it.name} - ${Object.keys(it).join(', ')})}`
      }),
    )

    console.log(registry.name)
    const historyReactions: Unsubscriber[] = []

    if (registry instanceof TaskStore) {
      historyReactions.push(this.createReaction(registry))
    }

    historyReactions.push(
      ...registry.nested.map(store => {
        if (store instanceof RootTaskStore) {
          console.log(`store ${store.name} instanceof RootTaskStore`)
          return this.render(store)
        }

        return this.createReaction(store)
      }),
    )

    return composeSubscribe(historyReactions)
  }
}

function toStringSafe(value: unknown) {
  if (value === undefined) {
    return 'undefined'
  }

  if (value === null) {
    return 'null'
  }

  if (typeof value === 'string') {
    return value
  }

  if (typeof value === 'number') {
    return value.toString()
  }

  if (typeof value === 'boolean') {
    return value.toString()
  }

  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2)
  }

  return `unknown = ${value}`
}

function printLine(text: string) {
  console.log(`[${getTimeFromDate(new Date())}] ${text}`)
}

function getTimeFromDate(date: Date) {
  return date.toISOString().slice(11, 23)
}

function getProgress(store: TaskStore) {
  return `${Math.round(store.request.progress * 100)}%`
}
