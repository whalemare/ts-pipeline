import { ActionState, Step } from '@ts-pipeline/core'
import { resolveError } from '@ts-pipeline/ts-core'

/**
 * Decorator to retry a function automatically a limited number of times (or until success) and with a certain delay between retries.
 *
 * Useful e.g. when working with a flaky API.
 */
export interface RetryStepProps {
  /**
   * Number of retries
   *
   * For example, if you pass '3' in count, it will retry 3 times, so total number of attempts will be 4
   *
   * @default 3
   */
  count?: number

  /**
   * Delay between retries in milliseconds
   *
   * @default 0
   */
  delay?: number
}

export const withRetry = <I, O>(step: Step<I, O>, props: RetryStepProps): Step<I, O> => {
  const { count = 3, delay = 0 } = props

  // we always add +1, because first call is not a retry
  const maxCountRetry = count

  const retry = async (state: ActionState, input: I, attemptsLeft: number): Promise<O> => {
    try {
      return await step.action(state, input)
    } catch (e) {
      const error = resolveError(e)
      if (attemptsLeft <= 0) {
        state.onData('Step failed with error: ' + error.message)
        throw error
      } else {
        const nextAttempts = attemptsLeft - 1
        const postfixInfo = nextAttempts === 0 ? 'When next call failed, we throw it' : ''

        const message =
          `Step failed with error. Left attempts ${attemptsLeft}, so we wait ${delay} and retry. ${postfixInfo}\nError: ${error.message}`.trim()
        state.onData(message)

        // sleep
        await new Promise(resolve => setTimeout(resolve, delay))

        return retry(state, input, nextAttempts)
      }
    }
  }

  return {
    name: step.name,
    action: async (state, input) => {
      return retry(state, input, maxCountRetry)
    },
  }
}
