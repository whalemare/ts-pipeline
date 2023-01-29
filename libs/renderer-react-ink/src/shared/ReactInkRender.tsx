import { Registry } from '@ts-pipeline/core'
import { AppRender } from '@ts-pipeline/renderer-core'
import { Unsubscriber } from '@ts-pipeline/ts-core'
import { render } from 'ink'
import React from 'react'

import { App } from './App'

export class ReactInkRender implements AppRender {
  render(root: Registry): Unsubscriber {
    const instance = render(<App registry={root} />)

    return () => {
      instance.unmount()
    }
  }
}
