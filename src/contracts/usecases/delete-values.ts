import { Either } from "../../main/shared"
import { GoogleSpreadSheetApi } from "../gateways/google-spreadsheet"

export interface DeleteValues {
  execute: (params: DeleteValues.Params) => Promise<DeleteValues.Result>
}

export namespace DeleteValues {
  export type Params = {
    auth: GoogleSpreadSheetApi
    id: string
  }

  export type Result = Either<Error, true>
}
