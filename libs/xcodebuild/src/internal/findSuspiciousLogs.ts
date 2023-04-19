const suspiciousTags = ['error', 'Error']

interface SuspiciousLog {
  text: string
  surrounding: string[]
}

export function findSuspiciousLogs(strings: string[]) {
  return strings.reduce(
    (total, next) => {
      const { suspicious, logs } = total

      logs.push(next)

      const lines = next.split('\n')
      for (let index = 0; index < lines.length; index++) {
        const line = lines[index]

        for (const tag of suspiciousTags) {
          if (line.startsWith(tag)) {
            // add some lines before and after
            suspicious.push({
              text: line,
              surrounding: [
                lines[index],
                lines[index + 1],
                lines[index + 2],
                lines[index + 3],
                lines[index + 4],
                lines[index + 5],
              ].filter(Boolean),
            })
          }
        }
      }

      return total
    },
    { suspicious: [], logs: [] } as { suspicious: SuspiciousLog[]; logs: string[] },
  )
}
