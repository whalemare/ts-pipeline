/* eslint-disable @typescript-eslint/no-explicit-any */
import { IsEqual, ConditionalExcept, HasRequiredKeys } from 'type-fest'

type OmitNever<T> = ConditionalExcept<T, never>

/**
 * Construct a type with the properties of T except for those in type K.
 */
type OmitTyped<F, S extends Partial<F> = F> = OmitNever<{
  [key in keyof F]: IsEqual<F[key], S[key]> extends true ? never : F[key]
}>

// type Test = OmitTyped<{ a: string; b: string }, { a: string }>
// type Test2 = OmitTyped<{ a: string; b: string }, { a: number }>

export type ExcludeArgsFromStep<
  OriginalArgs,
  SetupArgs extends Partial<OriginalArgs> = Partial<OriginalArgs>,
  R = OmitTyped<OriginalArgs, SetupArgs>,
> = R extends Record<string, never> // empty object
  ? any
  : R extends void
  ? any
  : // @ts-ignore
  HasRequiredKeys<R> extends true
  ? R
  : any
