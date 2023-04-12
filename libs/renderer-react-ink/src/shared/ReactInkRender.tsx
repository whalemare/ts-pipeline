import { Registry } from '@ts-pipeline/core'
import { AppRender } from '@ts-pipeline/renderer-core'
import { Unsubscriber } from '@ts-pipeline/ts-core'
import { render } from 'ink'
import React from 'react'

import { App } from './App'

export interface ReactInkRenderProps {
  /**
   * Reverse output order for remove flickering
   */
  reverse?: boolean

  /**
   * Disable embedded history for tasks
   */
  noEmbeddedHistory?: boolean
}

export class ReactInkRender implements AppRender {
  render(root: Registry): Unsubscriber {
    const instance = render(<App props={this.props} registry={root} />)

    return () => {
      instance.unmount()
    }
  }

  constructor(private props: ReactInkRenderProps = {}) {}
}
