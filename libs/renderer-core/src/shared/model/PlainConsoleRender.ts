/* eslint-disable no-console */
import { Registry } from '@ts-pipeline/core'
import { composeSubscribe, Unsubscriber } from '@ts-pipeline/ts-core'
import { reaction } from 'mobx'

import { AppRender } from '../entity/AppRender'

import { TaskStringRenderable } from './TaskStringRenderable'

export class PlainConsoleRender implements AppRender {
  render = (registry: Registry<any, any>): Unsubscriber => {
    console.log('PlainConsoleRender.render()')
    console.log(registry.name)
    const renderable = new TaskStringRenderable()

    const historyReactions = registry.nested.map(store => {
      console.log('registry.nested', store.name)
      renderable.render(store, 0)
      reaction(
        () => [store, store.history, store.name, store.args],
        () => {
          renderable.render(store, 0)
        },
        { fireImmediately: true },
      )

      return () => {
        console.log('unsubscribe')
      }
    })

    return composeSubscribe([
      //
      ...historyReactions,
    ])
  }
}
