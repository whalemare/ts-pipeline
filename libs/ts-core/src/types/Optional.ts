/**
 * Reach type with *null* and *undefined* values
 *
 * Use with caution, because it increase complexity
 */
export type Optional<T> = T | null | undefined
