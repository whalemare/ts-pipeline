import { workflow } from '@ts-pipeline/core'
import { increment, IncrementType } from '@ts-pipeline/step-increment'
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

  await workflow(async () => {
    const [prev, current] = await increment({
      platform: 'node',
      type: type,
    })

    const libs = (jetpack.list('libs') || [])
      .filter(it => !it.startsWith('.'))
      .map(lib => jetpack.cwd(`libs/${lib}`))

    // await Promise.all(
    //   libs.map(async lib => {
    //     return increment({
    //       platform: 'node',
    //       type: type,
    //       dir: lib.cwd(),
    //     })
    //   }),
    // )
  })
}

void deploy()
