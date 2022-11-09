import { GoogleSpreadsheet } from "google-spreadsheet"
import { GoogleSpreadSheetApi } from "../../contracts/gateways/google-spreadsheet"
// import crypto from "crypto"
import { left, right } from "../../main/shared"
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
}
