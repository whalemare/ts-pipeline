import { Registry } from '@ts-pipeline/core'
import { Box, useStdin } from 'ink'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import { RegistryView } from '../internal/view/RegistryView'

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
    <Box flexDirection="column" borderStyle="round" borderColor="green" flexGrow={1}>
      <RegistryView registry={registry} />
    </Box>
  )
})
