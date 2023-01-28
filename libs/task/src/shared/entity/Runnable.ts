/**
 * You can use is as runner
 */
export interface Runnable<I = any, O = any> {
  name: string

  /**
   * Entrypoint for start your pipeline
   *
   * Usually is't just shortcut for internal logic that run your pipeline
   */
  run: (input: I) => Promise<O>
}
