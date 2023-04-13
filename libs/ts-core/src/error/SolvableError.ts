interface Solution {
  text: string
}

export class SolvableError extends Error {
  constructor(message: string, solutions: Solution[]) {
    const solutionsText = solutions.map(s => s.text).join('\n')
    super([message, solutionsText].join('\n'))

    this.name = 'SolvableError'
  }
}
