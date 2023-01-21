import { observer } from 'mobx-react-lite'
import React from 'react'
import {Box, Text} from 'ink'

interface AppProps {
}

export const App = observer<AppProps>(() => {
  return <Box>
      <Text>hello</Text>
  </Box>
})


