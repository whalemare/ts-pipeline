import { Registry } from '@ts-pipeline/core'
import { Box, useInput, useApp, useStdin } from 'ink'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { RegistryView } from '../internal/view/RegistryView'

import type { ReactInkRenderProps } from './ReactInkRender'

interface AppProps {
  registry: Registry
  props: ReactInkRenderProps
}

export const App = observer<AppProps>(({ registry, props }) => {
  const app = useApp()
  const { isRawModeSupported } = useStdin()

  if (isRawModeSupported) {
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
  }

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="green">
      <RegistryView props={props} registry={registry} />
    </Box>
  )
})
