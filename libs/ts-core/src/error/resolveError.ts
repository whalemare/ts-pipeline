export function resolveError(e: unknown): Error {
  if (e instanceof Error) {
    return e
  } else if (typeof e === 'string' || typeof e === 'number') {
    return new Error(`${e}`)
  } else {
    return new Error(`Each error should be instanceof Error, but received: ${e}`)
  }
}
