import { observer } from 'mobx-react-lite'
import React from 'react'
import {Box, Text} from 'ink'
import { getRegistry } from '../../registry/getRegistry'

interface AppProps {
}

export const App = observer<AppProps>(() => {
  const registry = getRegistry()

  return <Box>
    {registry.tasks.map(task => <Text key={task.name}>
      {task.name}
    </Text>)}
  </Box>
})


