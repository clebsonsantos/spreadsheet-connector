import { Either } from "../../main/shared"
import { GoogleSpreadSheetApi } from "../gateways/google-spreadsheet"

export interface LoadValue {
  execute: (params: LoadValue.Params) => Promise<LoadValue.Result>
}

export namespace LoadValue {
  export type Params = {
    auth: GoogleSpreadSheetApi
  }

  export type Result = Either<Error, any[]>
}
