export const colors = {
  isSuppored: () => {
    const env = process.env as {
      NO_COLOR?: unknown
      FORCE_COLOR?: unknown
      CI?: unknown
    }

    const isDisabled = env.NO_COLOR || env.CI || process.argv?.includes('--no-color')

    return !isDisabled
  },
  yellow: (string: string) => {
    return `\x1b[33m${string}\x1b[39m`
  },
  red: (string: string) => {
    return `\x1b[31m${string}\x1b[39m`
  },
  green: (string: string) => {
    return `\x1b[32m${string}\x1b[39m`
  },
  blue: (string: string) => {
    return `\x1b[34m${string}\x1b[39m`
  },
}
