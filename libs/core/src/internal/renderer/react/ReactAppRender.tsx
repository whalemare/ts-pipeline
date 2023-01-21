import { Unsubscriber } from '@ts-pipeline/ts-core'
import { render } from 'ink'
import { makeAutoObservable } from 'mobx'
import React from 'react';
import {App} from './App'
import { AppRender } from '../AppRender'

export class ReactAppRender implements AppRender {
  render(): Unsubscriber {
    const instance = render(<App />)

    return () => {
      instance.unmount()
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}
