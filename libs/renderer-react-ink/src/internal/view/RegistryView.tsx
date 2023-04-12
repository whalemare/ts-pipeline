/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Registry, TaskStore } from '@ts-pipeline/core'
import { RootTaskStore } from '@ts-pipeline/runner-sequence'
import { Box } from 'ink'
import { observer } from 'mobx-react-lite'
import React from 'react'

import type { ReactInkRenderProps } from '../../shared/ReactInkRender'

import { TaskView } from './TaskView'

interface RegistryViewProps {
  registry: Registry
  props: ReactInkRenderProps
}

export const RegistryView = observer<RegistryViewProps>(({ registry, props }) => {
  return (
    <Box flexDirection={props.reverse ? 'column-reverse' : 'column'}>
      {registry instanceof TaskStore && <TaskView props={props} task={registry} />}

      <Box flexDirection={props.reverse ? 'column-reverse' : 'column'} marginLeft={2}>
        {registry.nested.map((task, index) => {
          if (task instanceof RootTaskStore) {
            return <RegistryView props={props} key={index} registry={task} />
          }

          return <TaskView props={props} key={index} task={task} />
        })}
      </Box>
    </Box>
  )
})
