import { Unsubscriber } from '@ts-pipeline/ts-core'
import { render } from 'ink'
import { makeAutoObservable } from 'mobx'
import React from 'react'

import { AppRender } from '../../../shared/AppRender'
import { PipelineRegistryStore } from '../../registry/PipelineRegistryStore'

import { App } from './App'

export class ReactIncRender implements AppRender {
  render(registry: PipelineRegistryStore): Unsubscriber {
    const instance = render(<App registry={registry} />)

    return () => {
      instance.unmount()
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}
