import { Box, Text } from 'ink'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'

import { TaskStore } from '@ts-pipeline/task'
import { getRegistry } from '../../registry/getRegistry'
import { PipelineRegistryStore } from '../../registry/PipelineRegistryStore'
import { TaskStringRenderable } from '../../TaskStringRenderable'

interface AppProps {
  registry: PipelineRegistryStore
}

// WIP: not worked at all!
export const App = observer<AppProps>(() => {
  const registry = getRegistry()

  return (
    <Box flexDirection="column" borderColor={'white'} borderStyle="classic" flexGrow={1}>
      {registry.tasks.map((task, index) => {
        return <TaskView key={index} task={task} />
      })}
    </Box>
  )
})

const TaskView = observer<{ task: TaskStore }>(({ task }) => {
  const renderer = useMemo(() => new TaskStringRenderable(), [])

  return (
    <Box>
      <Text>{renderer.render(task, Date.now())}</Text>
    </Box>
  )
})
