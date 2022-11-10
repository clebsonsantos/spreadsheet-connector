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

  private validate ({ body, method }: HttpRequest): string | true {
    if (!body) return "body"
    if (!body.credentials) return "body"
    if (!body.credentials.client_email || !body.credentials.private_key) {
      return "credentials"
    }
    if (!body.fields) return "fields"
    if (!body.spreadSheetId) return "spreadSheetId"
    if (!body.spreadSheetTabName) return "spreadSheetTabName"
    // if (method !== "GET" && !body.values) return "values"
    // if (method !== "GET" && !Object.values(body.values).length) return "values"
    return true
  }

  abstract perform (httpRequest: any): Promise<HttpResponse>
}
