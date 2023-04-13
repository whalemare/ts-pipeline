export interface Solution {
  title: string
}

export class SolvableError extends Error {
  constructor(message: string, solutions: Solution[]) {
    const solutionsText = solutions.map(s => s.title).join('\n')
    super([message, solutionsText].join('\n'))

    this.name = 'SolvableError'
  }
}
