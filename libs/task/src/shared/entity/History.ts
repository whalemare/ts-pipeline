export interface History {
  push(data: string): void

  items: string[]

  size: number
}
