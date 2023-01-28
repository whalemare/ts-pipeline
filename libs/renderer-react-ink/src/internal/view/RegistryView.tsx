/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Registry } from '@ts-pipeline/task'
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
      {registry.mainTask && <TaskView task={registry.mainTask} />}

      <Box flexDirection="column" marginLeft={2}>
        {registry.nested.map((task, index) => {
          return <TaskView key={index} task={task} />
        })}
      </Box>
    </Box>
  )
})
