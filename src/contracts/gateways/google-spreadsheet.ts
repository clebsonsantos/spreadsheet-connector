import { GoogleSpreadsheetWorksheet } from "google-spreadsheet"
import { ServerError } from "../../infra/errors/server-error"
import { Either } from "../../main/shared"

export interface GoogleSpreadSheetApi {
  authentication: () => Promise<GoogleSpreadSheetApi.Authentication.Result>
}

export namespace GoogleSpreadSheetApi {
  export namespace Authentication {
    export type Result = Either<ServerError, GoogleSpreadsheetWorksheet>
  }
}
