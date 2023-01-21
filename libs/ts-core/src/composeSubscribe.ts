import type { Unsubscriber } from './types/Unsubscriber'

export function composeSubscribe(unsubscribers: Unsubscriber[]): Unsubscriber {
  return () => unsubscribers.forEach(it => it())
}
