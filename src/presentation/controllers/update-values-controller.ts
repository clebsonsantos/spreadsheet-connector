import { UpdateValues } from "../../contracts/usecases"
import { SpreadSheet } from "../../infra/gateways"
import { HttpResponse, ok, unauthorized } from "../helpers"
import { Controller, HttpRequest } from "./controller"

export class UpdateValuesController extends Controller {
  constructor (private readonly updateValuessDataSheet: UpdateValues) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse> {
    const validate = this.validateFieldValues(httpRequest)
    if (validate) {
      return validate
    }

    const { credentials, fields, spreadSheetId, spreadSheetTabName } = httpRequest.body
    const auth = new SpreadSheet(credentials as any, spreadSheetId, spreadSheetTabName, fields)
    const result = await this.updateValuessDataSheet.execute({ auth, data: httpRequest.body.values })

    return result.isRight()
      ? ok({ id: result.value })
      : unauthorized(result.value)
  }
}
