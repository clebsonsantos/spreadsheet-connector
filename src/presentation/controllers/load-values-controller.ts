import { LoadValue } from "../../contracts/usecases/load-values"
import { SpreadSheet } from "../../infra/gateways"
import { HttpResponse, ok, unauthorized } from "../helpers"
import { Controller, HttpRequest } from "./controller"

export class LoadValuesController extends Controller {
  constructor (private readonly loadValuesDataSheet: LoadValue) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { credentials, fields, spreadSheetId, spreadSheetTabName } = httpRequest.body
    const auth = new SpreadSheet(credentials as any, spreadSheetId, spreadSheetTabName, fields)
    const result = await this.loadValuesDataSheet.execute({ auth })

    return result.isRight()
      ? ok(result.value)
      : unauthorized()
  }
}
