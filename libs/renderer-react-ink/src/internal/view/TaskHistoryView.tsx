import { TaskStore } from '@ts-pipeline/task'
import { Box, Text } from 'ink'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface TaskHistoryViewProps {
  task: TaskStore
}

export const TaskHistoryView = observer<TaskHistoryViewProps>(({ task }) => {
  return (
    <Box flexDirection="column">
      {task.history.items.map(item => {
        return (
          <Text key={item} dimColor>
            {`  -> ${item}`}
          </Text>
        )
      })}
    </Box>
  )
})
