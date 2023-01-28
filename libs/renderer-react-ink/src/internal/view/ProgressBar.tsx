import { Text } from 'ink'
import { observer } from 'mobx-react-lite'
import { RequestStore } from 'mobx-request'
import React, { useCallback, useEffect, useState } from 'react'

interface ProgressBarProps {
  request: RequestStore<unknown>
}

const frames = ['▏', '▎', '▍', '▌', '▋', '▊', '▉', '▊', '▋', '▌', '▍', '▎']

export const ProgressBar = observer<ProgressBarProps>(({ request }) => {
  const [frame, setFrame] = useState(0)

  const start = useCallback(() => {
    const interval = setInterval(() => {
      setFrame(prevFrame => prevFrame + 1)
    }, 60)

    return () => {
      setFrame(0)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (request.isLoading) {
      return start()
    }

    return undefined
  }, [request.isLoading])

  if (request.isSuccess) {
    return <Text>✅</Text>
  } else if (request.error) {
    return <Text>❌</Text>
  } else {
    return <Text>{frames[frame % frames.length]}</Text>
  }
})
