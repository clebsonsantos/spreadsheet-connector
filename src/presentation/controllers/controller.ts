import { RequiredFieldError } from "../errors"
import { badRequest, HttpResponse, serverError } from "../helpers"

export type HttpRequest = {
  method: string
  body: {
    values: {
      [key: string]: string
    }
    credentials: {
      [key: string]: string
    }
    fields: string[]
    spreadSheetId: string
    spreadSheetTabName: string
  }
}
export abstract class Controller {
  public async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validate(httpRequest)
      if (typeof error === "string") {
        return badRequest(new RequiredFieldError(error))
      }

      return await this.perform(httpRequest)
    } catch (error: any) {
      return serverError(error)
    }
  }

  public validateFieldValues (httpRequest: HttpRequest): HttpResponse | undefined {
    if (!httpRequest.body.values) return badRequest(new RequiredFieldError("values"))
    if (!Object.values(httpRequest.body.values).length) return badRequest(new RequiredFieldError("values"))
    return undefined
  }

  private validate ({ body }: HttpRequest): string | true {
    if (!body) return "body"
    if (!body.credentials) return "body"
    if (!body.credentials.client_email || !body.credentials.private_key) {
      return "credentials"
    }
    if (!body.fields) return "fields"
    if (!body.spreadSheetId) return "spreadSheetId"
    if (!body.spreadSheetTabName) return "spreadSheetTabName"
    return true
  }

  abstract perform (httpRequest: any): Promise<HttpResponse>
}
