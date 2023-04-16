export interface ActionLogger {
  warn(msg: string): void
  log(msg: string): void
  error(msg: string): void
}
