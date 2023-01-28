/* eslint-disable @typescript-eslint/ban-ts-comment */
import { RootTaskStore } from '@ts-pipeline/runner-sequence'
import { Registry, TaskStore } from '@ts-pipeline/core'
import { Box } from 'ink'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { TaskView } from './TaskView'

interface RegistryViewProps {
  registry: Registry
}

export const RegistryView = observer<RegistryViewProps>(({ registry }) => {
  return (
    <Box flexDirection="column">
      {registry instanceof TaskStore && <TaskView task={registry} />}

      <Box flexDirection="column" marginLeft={2}>
        {registry.nested.map((task, index) => {
          if (task instanceof RootTaskStore) {
            return <RegistryView key={index} registry={task} />
          }

          return <TaskView key={index} task={task} />
        })}
      </Box>
    </Box>
  )
})
