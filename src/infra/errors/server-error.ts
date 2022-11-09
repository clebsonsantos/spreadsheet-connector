export class ServerError extends Error {
  public readonly statusCode: number
  override readonly message: string
  constructor (statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.message = message
    this.name = "ServerError"
  }
}
