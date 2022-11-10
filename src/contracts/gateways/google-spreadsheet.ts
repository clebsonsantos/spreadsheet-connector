import { GoogleSpreadsheetWorksheet } from "google-spreadsheet"
import { InvalidParamsError } from "../../infra/errors/invalid-params-error"
import { ServerError } from "../../infra/errors/server-error"
import { Either } from "../../main/shared"

export interface GoogleSpreadSheetApi {
  authentication: () => Promise<GoogleSpreadSheetApi.Authentication.Result>
  loadValues: () => Promise<GoogleSpreadSheetApi.LoadValues.Result>
}

export namespace GoogleSpreadSheetApi {
  export namespace Authentication {
    export type Result = Either<ServerError, GoogleSpreadsheetWorksheet>
  }
  export namespace LoadValues {
    export type Result = Either<ServerError | InvalidParamsError, any[]>
  }
}
