import { Optional, SolvableError } from '@ts-pipeline/ts-core'

export function findErrorInText(text: string): Optional<Error> {
  if (
    text.includes(
      " requires a development team. Select a development team in the Signing & Capabilities editor. (in target '",
    )
  ) {
    return new SolvableError('Missing development team', [
      {
        title: 'Open XCode project and select development team in Signing & Capabilities editor',
      },
    ])
  }

  return undefined
}
