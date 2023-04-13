import { execAsync } from '@ts-pipeline/step-shell'
import { Solution, SolvableError } from '@ts-pipeline/ts-core'

export async function expectCliCommandExists(command: string, solutions?: Solution[]) {
  let output = ''

  try {
    output = await execAsync(`which ${command}`)
  } catch (e) {
    console.warn(`Silent error in expectCliCommandExists("${command}")`, e)
  }

  if (output.endsWith('not found') || output === '') {
    const message = `Expect that you have ${command} command installed (resolvable with 'which ${command}')`
    if (solutions && solutions?.length > 0) {
      throw new SolvableError(message, solutions)
    } else {
      throw new Error(message)
    }
  }
}
