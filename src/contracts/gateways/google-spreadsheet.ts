import { GoogleSpreadsheetWorksheet } from "google-spreadsheet"
import { ServerError } from "../../infra/errors/server-error"
import { Either } from "../../main/shared"

export interface GoogleSpreadSheetApi {
  authentication: () => Promise<GoogleSpreadSheetApi.Authentication.Result>
  loadValues: () => Promise<GoogleSpreadSheetApi.LoadValues.Result>
  addValues: (params: GoogleSpreadSheetApi.AddValues.Params) => Promise<GoogleSpreadSheetApi.AddValues.Result>
  deleteValues: (params: GoogleSpreadSheetApi.DeleteValues.Params) => Promise<GoogleSpreadSheetApi.DeleteValues.Result>
  updateValues: (params: GoogleSpreadSheetApi.UpdateValues.Params) => Promise<GoogleSpreadSheetApi.UpdateValues.Result>
}

export namespace GoogleSpreadSheetApi {

  export namespace Authentication {
    export type Result = Either<ServerError, GoogleSpreadsheetWorksheet>
  }

  export namespace LoadValues {
    export type Result = Either<ServerError, any[]>
  }

  export namespace AddValues {
    export type Params = { values: { [key: string]: string } }
    export type Result = Either<ServerError, { [key: string]: string }>
  }

  export namespace DeleteValues {
    export type Params = { id: string }
    export type Result = Either<ServerError, true>
  }

  export namespace UpdateValues {
    export type Params = { values: { [key: string]: string } }
    export type Result = Either<ServerError, { [key: string]: string }>
  }
}
