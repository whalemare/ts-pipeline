import { AppRender } from '@ts-pipeline/renderer-core'
import { Registry } from '@ts-pipeline/task'
import { Unsubscriber } from '@ts-pipeline/ts-core'
import { render } from 'ink'
import React from 'react'

import { App } from './App'

export class ReactIncRender implements AppRender {
  render(registry: Registry): Unsubscriber {
    const instance = render(<App registry={registry} />)

    return () => {
      instance.unmount()
    }
  }
}
