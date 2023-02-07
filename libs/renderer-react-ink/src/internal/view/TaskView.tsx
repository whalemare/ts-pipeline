import { TaskStore } from '@ts-pipeline/core'
import { Box } from 'ink'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { ProgressBar } from './ProgressBar'
import { TaskHistoryView } from './TaskHistoryView'
import { TaskResultView } from './TaskResultView'
import { TaskTitleView } from './TaskTitleView'

export const TaskView = observer<{ task: TaskStore }>(({ task }) => {
  return (
    <Box flexDirection="column">
      <Box>
        <ProgressBar request={task.request} />
        <TaskTitleView task={task} />
        <TaskResultView task={task} />
      </Box>

      <TaskHistoryView task={task} />
      {/* <Text>{renderer.render(task, Date.now())}</Text> */}
    </Box>
  )
})
