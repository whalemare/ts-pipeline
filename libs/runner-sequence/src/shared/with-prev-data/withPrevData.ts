import { Step } from '@ts-pipeline/core'

import { StepInput } from '../type/StepInput'
import { StepOutput } from '../type/StepOutput'
import { withData } from '../with-data/withData'
import { withPrev } from '../with-prev/withPrev'

export const withPrevData = <S extends Step, P>(step: S, input: (prev: P) => StepInput<S>) => {
  return withPrev<P, StepOutput<S>>(prev => {
    return withData<S>(step, input(prev))
  })
}
