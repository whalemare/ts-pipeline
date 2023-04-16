export interface Solution {
  title: string

  /**
   * Possible CLI command that can be executed to solve the problem
   */
  command?: string
}

export class SolvableError extends Error {
  constructor(message: string, solutions: Solution[]) {
    const solutionsText = solutions
      .map(s => {
        if (s.command) {
          return `${s.title}\n> ${s.command}`
        } else {
          return `${s.title}`
        }
      })
      .join('\n')
    super([message, solutionsText].join('\n'))

    this.name = 'SolvableError'
  }
}
