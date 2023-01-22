import { TaskStore } from '@ts-pipeline/task'
import { Box, Text } from 'ink'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'

import { TaskStringRenderable } from '../model/TaskStringRenderable'

export const TaskView = observer<{ task: TaskStore }>(({ task }) => {
  const renderer = useMemo(() => new TaskStringRenderable(), [])

  return (
    <Box>
      <Text>{renderer.render(task, Date.now())}</Text>
    </Box>
  )
})
