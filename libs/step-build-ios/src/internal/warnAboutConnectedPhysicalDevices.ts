import { ActionState } from '@ts-pipeline/core'
import { execAsync } from '@ts-pipeline/step-shell'

/**
 * Sometimes connected physical iOS devices can affect on build process, so we need to warn user about it when build app
 */
export async function warnAboutConnectedPhysicalDevices(ui: ActionState) {
  try {
    const response = await execAsync(
      'xcrun xctrace list devices | grep -v "Simulator" | grep -E "iPad|iPhone|iPod"',
    )

    if (response.trim().length > 0) {
      ui.logger.error(
        `You have connected physical iOS devices, that can affect on build process. If you have problems with build, try to disconnect them.\n\n${response}`,
      )
    }
  } catch (e) {
    console.warn('Can not check connected physical iOS devices', JSON.stringify(e, null, 2))
  }
}
