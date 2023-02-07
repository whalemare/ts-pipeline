export interface History<T> {
  push(data: T): void

  items: T[]

  size: number
}
