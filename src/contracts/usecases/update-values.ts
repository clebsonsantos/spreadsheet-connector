import { Either } from "../../main/shared"
import { GoogleSpreadSheetApi } from "../gateways/google-spreadsheet"

export interface UpdateValues {
  execute: (params: UpdateValues.Params) => Promise<UpdateValues.Result>
}

export namespace UpdateValues {
  export type Params = {
    auth: GoogleSpreadSheetApi
    data: {
      [key: string]: string
    }
  }

  export type Result = Either<Error, {
    [key: string]: string
  }>
}
