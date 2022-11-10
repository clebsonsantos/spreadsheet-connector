class Exception {
  public readonly message: string
  public readonly name: string
  public stack?: string
  constructor (message: string, name: string) {
    this.message = message
    this.name = name
  }
}

export class ServerError extends Exception {
  constructor (error?: Error) {
    super("Server failed. Try again soon.", "ServerError")
    this.stack = error?.stack
  }
}

export class RequiredFieldError extends Exception {
  constructor (fieldName: string) {
    super(`The field ${fieldName} is required`, "RequiredFieldError")
  }
}

export class UnauthorazedError extends Exception {
  constructor () {
    super(`Unauthorazed`, "UnauthorazedError")
  }
}
