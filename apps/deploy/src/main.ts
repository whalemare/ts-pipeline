import { exec, ExecOptions } from 'child_process'

import { workflow } from '@ts-pipeline/core'
import { increment, IncrementType } from '@ts-pipeline/step-increment'
import jetpack from 'fs-jetpack'

/**
 * Promisified child_process.exec
 *
 * @param cmd
 * @param opts See child_process.exec node docs
 * @param {stream.Writable} opts.stdout If defined, child process stdout will be piped to it.
 * @param {stream.Writable} opts.stderr If defined, child process stderr will be piped to it.
 *
 * @returns {Promise<{ stdout: string, stderr: stderr }>}
 */
async function execp(
  cmd: string,
  opts: ExecOptions & { stdout?: NodeJS.WritableStream; stderr?: NodeJS.WritableStream } = {
    stderr: process.stderr,
    stdout: process.stdout,
  },
): Promise<{ stdout: string; stderr?: string }> {
  return new Promise((resolve, reject) => {
    const child = exec(cmd, opts, (err, stdout, stderr) =>
      err
        ? reject(err)
        : resolve({
            stdout: stdout,
            stderr: stderr,
          }),
    )

    if (opts.stdout) {
      child.stdout?.pipe(opts.stdout)
    }
    if (opts.stderr) {
      child.stderr?.pipe(opts.stderr)
    }
  })
}

/**
 * Increment, build and deploy libraries
 *
 * @example
 *
 * yarn ts-node tools/scripts/deploy.ts patch - increment with patch, build and deploy
 */
async function deploy() {
  const [_, __, incrementTypeRaw] = process.argv
  const type = IncrementType.NONE

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
  // const allowedIncrementTypes = Object.values(IncrementType)
  // const incrementType = allowedIncrementTypes.find(it => it === incrementTypeRaw)
  // if (!incrementType) {
  //   throw new Error(`Expect one of increment types: ${allowedIncrementTypes}`)
  // }

  // const project = jetpack
  // const path = `${project.cwd()}/package.json`
  // const packageJson = jetpack.read(path, 'json')
  // const rawVersion = packageJson.version
  // ui.message(`Read rawVersion from ${path} = ${rawVersion}`)
  // const incrementedVersion = incrementVersion(rawVersion, incrementType)
  // await updatePackageJson(jetpack, incrementedVersion)

  // libs.push(jetpack.cwd('apps/react-native-deploy'))

  // for (const lib of libs) {
  //   await updatePackageJson(lib, incrementedVersion)
  // }

  // ui.success(`Success increment version ${rawVersion} -> ${incrementedVersion}`)

  // ui.message('Start generating index files')
  // await execp(`yarn generate:index`)

  // git.commit(`Update version to ${incrementedVersion}`)
  // git.tag(incrementedVersion, 'update version')

  // await execp('yarn build')
  // await execp('yarn deploy')
  // git.push()
}

void deploy()
