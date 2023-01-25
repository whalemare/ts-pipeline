import { Registry } from '@ts-pipeline/task'
import { Box, useStdin } from 'ink'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import { TaskView } from '../internal/view/TaskView'

interface AppProps {
  registry: Registry
}

export const App = observer<AppProps>(({ registry }) => {
  const { setRawMode, isRawModeSupported } = useStdin()

  useEffect(() => {
    if (isRawModeSupported) {
      setRawMode(true)
    }
  }, [isRawModeSupported])

  return (
    <Box flexDirection="column" borderColor={'white'} borderStyle="classic" flexGrow={1}>
      {registry.tasks.map((task, index) => {
        return <TaskView key={index} task={task} />
      })}
    </Box>
  )
})
