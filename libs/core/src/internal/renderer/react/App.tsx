import { observer } from 'mobx-react-lite'
import React, { useEffect, useMemo, useState } from 'react'
import {Box, Text} from 'ink'
import { getRegistry } from '../../registry/getRegistry'
import { PipelineRegistryStore } from '../../registry/PipelineRegistryStore'
import { TaskStore } from '../../task/TaskStore'
import { TaskStringRenderable } from '../../task/renderable/TaskStringRenderable'
import { autorun } from 'mobx'

type AppProps = {
  registry: PipelineRegistryStore
}

// WIP: not worked at all!
export const App = observer<AppProps>(() => {
  const registry = getRegistry()
  console.log('App render', registry.tasks)
  const [tasks, setTasks] = useState(registry.tasks)

  useEffect(() => {
    autorun(() => {
      console.log("registry.tasks", registry.tasks.length)
      setTasks(registry.tasks)
    })
  }, [])

  return <Box borderColor={'red'} borderStyle='classic' flexGrow={1}>
    {tasks.map(task => {
      return <Text>
        {task.name}
      </Text>
    })}
  </Box>
})


const TaskView = observer<{task: TaskStore}>(({ task }) => {
  console.log("TaskView render", task.name)
  const renderer = useMemo(() => new TaskStringRenderable(), [])
  task.args
  task.name
  task.history
  task.request.isLoading
  task.request.value
  return <Box>
      <Text>
        {renderer.render(task, Date.now())}
      </Text>
    </Box>
})