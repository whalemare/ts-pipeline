import { isPrimitive } from 'util'

import { TaskStore } from '@ts-pipeline/task'
import chalk from 'chalk'
import { Box, Text } from 'ink'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'

interface TaskTitleViewProps {
  task: TaskStore
}

export const TaskTitleView = observer<TaskTitleViewProps>(({ task }) => {
  let title = task.name

  // when actions have some activity, we mark it as bold
  if (task.request.isLoading || task.request.isSuccess || task.request.error) {
    title = chalk.bold(title)
  } else {
    // otherwise, make it some dim
    title = chalk.dim(title)
  }

  return (
    <Box>
      <Text>{title}</Text>
      <TaskArgView task={task} />
    </Box>
  )
})

interface ArgumentVo {
  key: string
  value: string
}

const TaskArgView = observer<TaskTitleViewProps>(({ task }) => {
  const args: ArgumentVo[] = useMemo(() => {
    if (!task.args) {
      return []
    }

    const items: ArgumentVo[] = []

    if (isPrimitive(task.args)) {
      items.push({ key: '', value: String(task.args) })
    } else {
      if (task.args && typeof task.args === 'object') {
        for (const key in task.args) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const value = task.args[key]
          // console.log('TaskArgView', key, value)

          if (isPrimitive(value)) {
            items.push({ key, value: String(value) })
          } else {
            items.push({ key, value: '...' })
          }
        }
      }
    }

    return items
  }, [task.args])

  const percent = useMemo(() => {
    if (task.request.progress !== 0 && task.request.progress !== 1) {
      return `${Math.round(task.request.progress * 100)}%`
    }

    return ''
  }, [task.request.progress])

  return (
    <Box>
      {!!percent && <Text dimColor> {percent}</Text>}
      {args.length > 0 && (
        <Box marginLeft={1} flexDirection="column" alignItems="flex-start">
          {args.map(arg => {
            return (
              <Box key={arg.key}>
                <Text>{chalk.blackBright(arg.key)}: </Text>
                <Text>{arg.value}</Text>
              </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )
})
