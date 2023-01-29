import { TaskStore } from '@ts-pipeline/core'
import chalk from 'chalk'
import { Box, Text } from 'ink'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface TaskHistoryViewProps {
  task: TaskStore
}

const batchSize = 5

export const TaskHistoryView = observer<TaskHistoryViewProps>(({ task }) => {
  const batch = task.history.slice(task.history.length - batchSize)

  return (
    <Box marginLeft={2} flexDirection="column">
      {batch.map((item, index) => {
        const color = item.type === 'message' ? chalk.dim : chalk.white
        return <Text key={index}>{`${color(item.value?.toString().trim())}`}</Text>
      })}
    </Box>
  )
})
