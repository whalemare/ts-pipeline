import { Existed } from '../types/Existed'
import { Optional } from '../types/Optional'

/**
 * Check that value is not null and not undefined
 */
export function isExist<T>(item: Optional<T>): item is Existed<T> {
  return item !== null && item !== undefined
}
