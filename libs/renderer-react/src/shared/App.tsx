import { Registry } from '@ts-pipeline/task'
import React from 'react'

export interface ReactRendererProps {
  registry: Registry
}

export function App(props: ReactRendererProps) {
  return (
    <div>
      <h1>Welcome to ReactRenderer!</h1>
      <h1>
        {props.registry.nested
          .map(it => {
            return it.name
          })
          .join('\n')}
      </h1>
    </div>
  )
}
