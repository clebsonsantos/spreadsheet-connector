import { Either } from "../../main/shared"
import { GoogleSpreadSheetApi } from "../gateways/google-spreadsheet"

export interface AddValues {
  execute: (params: AddValues.Params) => Promise<AddValues.Result>
}

export namespace AddValues {
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
