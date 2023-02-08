import { git } from '@lamantin/fastpush'
import { render } from '@ts-pipeline/renderer-react-ink'
import { parallel } from '@ts-pipeline/runner-parallel'
import { sequence, withData, withPrevData } from '@ts-pipeline/runner-sequence'
import { increment, IncrementType, AppVersion } from '@ts-pipeline/step-increment'
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

  const incrementNode = withData(increment, {
    //
    type,
    platform: 'node',
    noBuildIncrement: true,
  })

  const incrementLibs = (jetpack.list('libs') || [])
    .filter(it => !it.startsWith('.'))
    .map(lib => jetpack.cwd(`libs/${lib}`))
    .map(cwd => {
      return withPrevData<typeof increment, readonly [AppVersion, AppVersion]>(
        increment,
        ([_, currentVersion]) => ({
          dir: cwd.path(),
          platform: 'node',
          version: {
            marketing: currentVersion.marketing,
            build: 0, // no set build version
          },
        }),
      )
    })

  await render(
    sequence(
      'deploy @ts-pipeline',

      incrementNode,

      parallel(
        'set version to libraries',

        ...incrementLibs,

        withData(shell, {
          command: `yarn generate:index`,
        }),
      ),

      {
        name: 'git commit',
        action: async (ui, props) => {
          const [prev, version] = props

          git.commit(`🎉 Increment version ${version.marketing}`)
          git.tag(`${version?.marketing}`, 'increment')
          git.push()

          return version
        },
      },

      // TODO: for some reason types for `version` is not infered here, need deeging
      withPrevData<typeof shell, AppVersion>(shell, version => ({
        command: `yarn github:release ${version.marketing}`,
      })),
    ),
  )
}

void deploy()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
