import { Response } from "express"
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
  public async handle (httpRequest: HttpRequest, httpResponse: Response): Promise<Response> {
    const error = this.validate(httpRequest)
    if (typeof error === "string") {
      const badError = badRequest(new RequiredFieldError(error))
      return httpResponse.json(badError.data).status(badError.statusCode)
    }

    try {
      const result = await this.perform(httpRequest)
      return httpResponse.json(result.data).status(result.statusCode)
    } catch (error: any) {
      const err = serverError(error)
      return httpResponse.json(err.data).status(err.statusCode)
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
