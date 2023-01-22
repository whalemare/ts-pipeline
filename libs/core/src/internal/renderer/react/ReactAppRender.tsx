import { Unsubscriber } from '@ts-pipeline/ts-core'
import { render } from 'ink'
import { makeAutoObservable } from 'mobx'
import React from 'react';
import {App} from './App'
import { AppRender } from '../../../shared/AppRender'
import { PipelineRegistryStore } from '../../registry/PipelineRegistryStore';

export class ReactAppRender implements AppRender {
  render(): Unsubscriber {
    const instance = render(<App registry={this.registry} />)

    return () => {
      instance.unmount()
    }
  }

  constructor(private registry: PipelineRegistryStore) {
    makeAutoObservable(this)
  }
}
