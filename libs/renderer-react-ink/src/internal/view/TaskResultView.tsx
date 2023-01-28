import { TaskStore } from '@ts-pipeline/task'
import { Box, Text } from 'ink'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface TaskResultViewProps {
  task: TaskStore
}

export const TaskResultView = observer<TaskResultViewProps>(({ task }) => {
  return (
    <Box marginLeft={1}>
      {task.request.isSuccess && task.request.value && (
        <Text color={'green'}>{JSON.stringify(task.request.value)}</Text>
      )}
      {task.request.error && <Text color={'red'}>{JSON.stringify(task.request.error)}</Text>}
    </Box>
  )
})
