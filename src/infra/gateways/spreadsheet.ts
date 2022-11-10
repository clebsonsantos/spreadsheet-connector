import { GoogleSpreadsheet } from "google-spreadsheet"
import { GoogleSpreadSheetApi } from "../../contracts/gateways/google-spreadsheet"
// import crypto from "crypto"
import { left, right } from "../../main/shared"
import { InvalidParamsError } from "../errors/invalid-params-error"
import { ServerError } from "../errors/server-error"

type Credentials = {
  client_email: string
  private_key: string
}

export class SpreadSheet implements GoogleSpreadSheetApi {
  constructor (
    private readonly googleCredentials: Credentials,
    private readonly spreadSheetId: string,
    private readonly spreadSheetTabName: string

  ) {}

  public async authentication (): Promise<GoogleSpreadSheetApi.Authentication.Result> {
    try {
      const doc = new GoogleSpreadsheet(this.spreadSheetId)
      const credentials = this.googleCredentials

      await doc.useServiceAccountAuth(credentials)

      await doc.loadInfo()
      const sheetRange = doc.sheetsByTitle[this.spreadSheetTabName]

      return right(sheetRange)
    } catch (error: any) {
      return left(new ServerError(500, error.message))
    }
  }

  public async loadValues ({ headers }: GoogleSpreadSheetApi.LoadValues.Params): Promise<GoogleSpreadSheetApi.LoadValues.Result> {
    const range = await this.authentication()

    if (range.isLeft()) {
      return left(range.value)
    }

    if (!headers.length) {
      return left(new InvalidParamsError("headers"))
    }
    const json: any = {}
    const values = await range.value.getRows()

    const result: any[] = []

    values.forEach((item) => {
      for (const header of headers) {
        if (item[header]) {
          json[header] = item[header]
        }
      }
      result.push(json)
    })

    return right(result)
  }
}
