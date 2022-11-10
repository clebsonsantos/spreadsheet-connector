import { RequiredFieldError } from "../errors"
import { badRequest, HttpResponse, serverError } from "../helpers"

type HttpRequest = {
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
    const error = this.validate(httpRequest)
    if (typeof error === "string") {
      return badRequest(new RequiredFieldError(error))
    }
    try {
      return await this.perform(httpRequest)
    } catch (error: any) {
      return serverError(error)
    }
  }

  private validate ({ body }: HttpRequest): string | true {
    if (!body.credentials.client_email || !body.credentials.private_key) {
      return "credentials"
    }
    if (!Object.values(body.values).length) return "values"
    if (!Object.values(body.fields).length) return "fiels"
    if (!Object.values(body.spreadSheetId).length) return "spreadSheetId"
    if (!Object.values(body.spreadSheetTabName).length) return "spreadSheetTabName"
    return true
  }

  abstract perform (httpRequest: any): Promise<HttpResponse>
}
