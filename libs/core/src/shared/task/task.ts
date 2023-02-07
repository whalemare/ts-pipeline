import { TaskStore } from './TaskStore'
import { TaskStoreProps } from './entity/TaskStoreProps'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const task = <
  Props extends TaskStoreProps = TaskStoreProps,
  // Fetch = Props extends TaskStoreProps<infer A, infer R> ? (...args: A) => Promise<R> : never,
>(
  props: Props,
) => {
  const fetch = async (
    args: OmitFirst<Parameters<Props['action']>>,
  ): Promise<Awaited<ReturnType<Props['action']>>> => {
    const store = new TaskStore(props)

    // TODO ? how to avoid this ?
    // getRegistry().nested.push(store)

    return store.request.fetch(args)
  }

  return fetch
}

/**
 * First argument in Props[action] is always UI that genered inside module
 * User don't need to provide it
 */
type OmitFirst<T extends any[]> = T extends [any, ...infer R] ? R : never
