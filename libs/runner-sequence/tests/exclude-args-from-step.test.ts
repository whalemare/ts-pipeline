/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { expectType } from 'tsd'

import { ExcludeArgsFromStep } from '../src/shared/setup-step/ExcludeArgsFromStep'

describe('exclude args from step', () => {
  it('when fully args excluded should be used any', async () => {
    interface Args {
      size: number
    }

    type Result = ExcludeArgsFromStep<Args, Args>

    // any
    expectType<Result>({})
    expectType<Result>(null)
    expectType<Result>(undefined)
    expectType<Result>([])
    expectType<Result>(0)
    expectType<Result>('')
  })

  it('should require partial of not existed', async () => {
    interface Args {
      size: number
      weight: number
    }

    type Result = ExcludeArgsFromStep<Args, { size: number }>

    expectType<Result>({ weight: 4 })
  })

  it('should fail when keys not equals to types', async () => {
    type Result = ExcludeArgsFromStep<
      { size: number },
      // @ts-expect-error size should be number
      { size: string }
    >

    expectType<Result>({ size: 3 })
  })
})
