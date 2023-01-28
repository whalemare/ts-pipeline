import { AppRender } from '@ts-pipeline/renderer-core'
import { Registry } from '@ts-pipeline/task'
import { Unsubscriber } from '@ts-pipeline/ts-core'
import { render } from 'ink'
import React from 'react'

import { App } from './App'

export class ReactIncRender implements AppRender {
  render(registry: Registry): Unsubscriber {
    process.stdin.addListener('data', input => {
      console.log('input', input.toJSON())
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (input === '\x03' || input.toJSON().data[0] === 3) {
        registry.mainTask.request.cancel()
        registry.nested.forEach(task => task.request.cancel())
      }
    })

    const instance = render(<App registry={registry} />)

    return () => {
      instance.unmount()
    }
  }
}
