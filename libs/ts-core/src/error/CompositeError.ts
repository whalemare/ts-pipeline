export class CompositeError extends Error {
  constructor(public errors: Error[]) {
    super(errors.map(it => it.message).join('\n'))
    this.name = `CompositeError(${errors.length})`
  }
}
