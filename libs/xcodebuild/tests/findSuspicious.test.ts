import { findSuspiciousLogs } from '../src/internal/findSuspiciousLogs'

import assetsLogs from './logs.test'

describe(`find suspicious`, () => {
  test('should parse logs passed as single line', () => {
    const { suspicious } = findSuspiciousLogs([assetsLogs])
    expect(suspicious.length).toBeGreaterThan(0)
  })
})
