/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */

import { createProgram } from './createProgram'

describe('commander-ts', () => {
  it('can create program without options', () => {
    const run = jest.fn()
    const program = createProgram(
      {
        name: 'no-options',
        options: {},
      },
      run,
    )

    program.parse([])

    expect(run).toBeCalledTimes(1)
  })

  it('can create program with optional string option', () => {
    const program = createProgram(
      {
        name: 'increment',
        options: {
          type: {
            type: 'string',
            char: 't',
          },
        },
      },
      async ({ type }) => {
        // trying to access optional string as required
        // @ts-expect-error
        type.charAt(0)
      },
    )
    program.parse([])
  })

  it('can create program with required string option', () => {
    const program = createProgram(
      {
        name: 'increment',
        options: {
          type: {
            char: 't',
            type: 'string',
            required: true,
          },
        },
      },
      async ({ type }) => {
        // can access type as required, because it required
        type.charAt(0)

        expect(typeof type).toStrictEqual('string')
      },
    )

    program.parse(['--type', 'data'], { from: 'user' })
    program.parse(['-t', 'data'], { from: 'user' })
  })

  it('can create program with required boolean option', () => {
    const program = createProgram(
      {
        name: 'increment',
        options: {
          force: {
            char: 'f',
            type: 'boolean',
            required: true,
          },
        },
      },
      async ({ force }) => {
        expect(typeof force).toStrictEqual('boolean')
      },
    )

    program.parse(['--force'], { from: 'user' })
    program.parse(['-f'], { from: 'user' })
  })
})
