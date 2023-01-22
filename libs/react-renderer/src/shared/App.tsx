import { PipelineRegistryStoreType } from '@ts-pipeline/core';
import React from 'react';

export interface ReactRendererProps {
  registry: PipelineRegistryStoreType
}

export function App(props: ReactRendererProps) {
  return (
    <div>
      <h1>Welcome to ReactRenderer!</h1>
      <h1>{props.registry.tasks.map(it => {
        return it.name
      }).join("\n")}</h1>
    </div>
  );
}
