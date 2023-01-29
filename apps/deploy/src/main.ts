import { git } from '@lamantin/fastpush'
import { render } from '@ts-pipeline/renderer-react-ink'
import { parallel } from '@ts-pipeline/runner-parallel'
import { sequence, setupStep } from '@ts-pipeline/runner-sequence'
import { increment, IncrementType } from '@ts-pipeline/step-increment'
import { shell } from '@ts-pipeline/step-shell'
import jetpack from 'fs-jetpack'

/**
 * Increment, build and deploy libraries
 *
 * @example
 *
 * yarn ts-node tools/scripts/deploy.ts patch - increment with patch, build and deploy
 */
async function deploy() {
  const [_, __, incrementTypeRaw] = process.argv
  if (!Object.values(IncrementType).includes(incrementTypeRaw as IncrementType)) {
    throw new Error(
      `Allowed only ${Object.values(IncrementType).join(', ')}, but received ${incrementTypeRaw}`,
    )
  }

  const type = incrementTypeRaw as IncrementType

  const incrementBuild = setupStep(increment, {
    //
    type,
    platform: 'node',
    noBuildIncrement: true,
  })

  const incrementLibs = (jetpack.list('libs') || [])
    .filter(it => !it.startsWith('.'))
    .map(lib => jetpack.cwd(`libs/${lib}`))
    .map(cwd => {
      return setupStep(increment, {
        dir: cwd.path(),
      })
    })

  await render(
    sequence(
      'deploy @ts-pipeline',

      incrementBuild,
      {
        name: 'map-props',
        action: async (_, [, current]) => {
          return {
            platform: 'node' as const,
            version: current,
          }
        },
      },

      parallel(
        'set version to libraries',

        ...incrementLibs,

        setupStep(shell, {
          command: `yarn generate:index`,
        }),
      ),

      {
        name: 'git commit',
        action: async (ui, { version }) => {
          git.commit(`🎉 Increment version ${version?.marketing}`)
          git.tag(`${version?.marketing}`, 'increment')
        },
      },

      setupStep(shell, { command: 'yarn build' }),
      setupStep(shell, { command: 'yarn release' }),
    ),
  )
}

void deploy()
