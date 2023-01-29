import { Registry } from '@ts-pipeline/core'
import { Box, useInput, useApp } from 'ink'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { RegistryView } from '../internal/view/RegistryView'

interface AppProps {
  registry: Registry
}

export const App = observer<AppProps>(({ registry }) => {
  const app = useApp()
  useInput((input, key) => {
    const isExit = (key.ctrl && input === 'c') || (key.ctrl && input === 'q') || input === 'œ'
    if (isExit) {
      registry.cancel()
      app.exit()
      setTimeout(() => {
        process.exit(-1)
      }, 1000)
    }
  })

  return (
    <Box flexDirection="column-reverse" borderStyle="round" borderColor="green">
      <RegistryView registry={registry} />
    </Box>
  )
})
