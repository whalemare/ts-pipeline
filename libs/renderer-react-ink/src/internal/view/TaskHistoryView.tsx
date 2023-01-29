import { TaskStore } from '@ts-pipeline/core'
import chalk from 'chalk'
import { Box, Text } from 'ink'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface TaskHistoryViewProps {
  task: TaskStore
}

export const TaskHistoryView = observer<TaskHistoryViewProps>(({ task }) => {
  return (
    <Box marginLeft={2} flexDirection="column">
      {task.history.items.map((item, index) => {
        const color = item.type === 'message' ? chalk.dim : chalk.white
        return <Text key={index}>{`${color(item.value?.toString().trim())}`}</Text>
      })}
    </Box>
  )
})
