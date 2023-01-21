/**
 * Remove null and undefined from T
 */
export type Existed<T> = Exclude<T, null | undefined>

export type ExistedNested<T> = {
  [K in keyof T]-?: Existed<T[K]>
}
