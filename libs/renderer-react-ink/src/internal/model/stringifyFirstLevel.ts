export function stringifyFirstLevel(object: object) {
  return Object.keys(object)
    .map((arg: unknown) => {
      if (arg && typeof arg === 'object') {
        return Object.keys(arg).map(key => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const value = arg[key]

          if (value && typeof value === 'object') {
            return `${key}: {...}`
          }
          return `${key}: ${String(value)}`
        })
      }

      return arg
    })
    .join(', ')
    .trim()
}
