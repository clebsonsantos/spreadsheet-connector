export class InvalidParamsError extends Error {
  public readonly fieldName: string
  constructor (fieldName: string) {
    super(`Invalid param: ${fieldName}`)
    this.fieldName = fieldName
    this.name = "InvalidParamsError"
  }
}
