import { TaskStore } from '@ts-pipeline/core'
import { Box } from 'ink'
import { observer } from 'mobx-react-lite'
import React from 'react'

import type { ReactInkRenderProps } from '../../shared/ReactInkRender'

import { ProgressBar } from './ProgressBar'
import { TaskHistoryView } from './TaskHistoryView'
import { TaskResultView } from './TaskResultView'
import { TaskTitleView } from './TaskTitleView'

interface TaskViewProps {
  task: TaskStore
  props: ReactInkRenderProps
}

export const TaskView = observer<TaskViewProps>(({ task, props }) => {
  return (
    <Box flexDirection="column">
      <Box>
        <ProgressBar request={task.request} />
        <TaskTitleView task={task} />
        <TaskResultView task={task} />
      </Box>

      {props.noEmbeddedHistory ? null : <TaskHistoryView task={task} />}
    </Box>
  )
})
