// any required for autotypings
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TaskStoreProps } from '@ts-pipeline/task'

/**
 * Step - it's just a regular function that you can use in your pipeline
 */
export type Step<A extends any[] = any[], R = any> = TaskStoreProps<A, R>
