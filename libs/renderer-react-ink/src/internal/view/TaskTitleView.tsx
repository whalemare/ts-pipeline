import { TaskStore } from '@ts-pipeline/task'
import chalk from 'chalk'
import { Box, Text } from 'ink'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'

import { stringifyFirstLevel } from '../model/stringifyFirstLevel'

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

  const args = task.args ? stringifyFirstLevel(task.args) : ''

  return (
    <Box>
      <Text>{title}</Text>
      <TaskArgView task={task} />
    </Box>
  )
})

interface ArgumentVo {
  key: string
  value: unknown
}

const TaskArgView = observer<TaskTitleViewProps>(({ task }) => {
  // const args: ArgumentVo[] = useMemo(() => {
  //   const items: ArgumentVo[] = []
  //   if (isPrimitive(task.args)) {
  //     items.push({ key: '', value: task.args })
  //   } else {
  //     for (const key in task.args) {
  //       const value = task.args[key]

  //       items.push({ key, value: value })
  //     }
  //   }

  //   return items
  // }, [])

  const percent = useMemo(() => {
    if (task.request.progress !== 0 && task.request.progress !== 1) {
      return `${Math.round(task.request.progress * 100)}%`
    }

    return ''
  }, [task.request.progress])

  return (
    <Box flexDirection="column">
      {!!percent && <Text dimColor> {percent}</Text>}
      <Text>{JSON.stringify(task.args)}</Text>
      {/* {args.map(it => {
        return (
          <Text>
            <>
              {it.key} ${it.value}
            </>
          </Text>
        )
      })} */}
    </Box>
  )
})
