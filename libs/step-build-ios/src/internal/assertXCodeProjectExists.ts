/* eslint-disable no-console */
import * as jetpack from 'fs-jetpack'

export async function assertXCodeProjectExists(directory: string) {
  const cwd = jetpack.cwd(directory)

  const possibleFiles = await cwd.findAsync({
    matching: '*.xcworkspace',
    directories: true,
    files: false,
    recursive: false,
  })

  if (possibleFiles.length === 0) {
    throw new Error(`No XCode project found in ${cwd.path()}, but expected *.xcworkspace file`)
  }

  if (possibleFiles.length > 1) {
    console.info(
      `Multiple XCode projects found in ${cwd.path()}, but expected only one *.xcworkspace file. Used first one: ${
        possibleFiles[0]
      }`,
    )
  }

  return possibleFiles[0]
}
