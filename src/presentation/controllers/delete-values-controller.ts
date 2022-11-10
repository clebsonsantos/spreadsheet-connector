import { badRequest } from "./../helpers/http"
import { DeleteValues } from "../../contracts/usecases"
import { SpreadSheet } from "../../infra/gateways"
import { HttpResponse, ok, unauthorized } from "../helpers"
import { Controller, HttpRequest } from "./controller"
import { RequiredFieldError } from "../errors"

export class DeleteValuesController extends Controller {
  constructor (private readonly deleteValuessDataSheet: DeleteValues) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse> {
    const validate = this.validateFieldValues(httpRequest)
    if (validate) {
      return validate
    }

    if (!httpRequest.body.values.ID) {
      return badRequest(new RequiredFieldError("ID"))
    }

    const { credentials, fields, spreadSheetId, spreadSheetTabName } = httpRequest.body
    const auth = new SpreadSheet(credentials as any, spreadSheetId, spreadSheetTabName, fields)
    const result = await this.deleteValuessDataSheet.execute({ auth, id: httpRequest.body.values.ID })

    return result.isRight()
      ? ok({ id: result.value })
      : unauthorized(result.value)
  }
}
