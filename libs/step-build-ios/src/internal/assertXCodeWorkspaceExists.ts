/* eslint-disable no-console */
import { SolvableError } from '@ts-pipeline/ts-core'
import * as jetpack from 'fs-jetpack'

export async function assertXCodeWorkspaceExists(directory: string) {
  const cwd = jetpack.cwd(directory)

  const possibleFiles = await cwd.findAsync({
    matching: '*.xcworkspace',
    directories: true,
    files: false,
    recursive: false,
  })

  if (possibleFiles.length === 0) {
    // TODO: check that `ios` folder exists in this level, for show suggestion
    throw new SolvableError(
      `No XCode project found in ${cwd.path()}, but expected *.xcworkspace directory`,
      [
        {
          title: `Maybe you forgot to run \`cd "${cwd.path()}" && pod install\`?`,
        },
        {
          title: 'Maybe you specified the wrong path to `ios` directory?',
        },
      ],
    )
  }

  if (possibleFiles.length > 1) {
    console.info(
      `Multiple XCode projects found in ${cwd.path()}, but expected only one *.xcworkspace file. Used first one: ${
        possibleFiles[0]
      }`,
    )
  }

  const xcworkspacePath = jetpack.cwd(possibleFiles[0]).path()
  const projectName = xcworkspacePath.split('/').pop()?.replace('.xcworkspace', '')
  if (!projectName) {
    throw new Error(
      `Can't get project name from path, it's bug, please create issue and provide this data: 
      projectName = ${projectName}
      xcworkspacePath = ${xcworkspacePath}
      possibleFiles = ${possibleFiles.join('\n')}
      directory = ${directory}
      `,
    )
  }

  return {
    xcworkspacePath,
    projectName,
  }
}
