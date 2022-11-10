import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet"
import { GoogleSpreadSheetApi } from "../../contracts/gateways/google-spreadsheet"
import crypto from "crypto"
import { left, right } from "../../main/shared"
import { ServerError } from "../errors"

type Credentials = {
  client_email: string
  private_key: string
}
type ObjectData = {
  [key: string]: string
}

export class SpreadSheet implements GoogleSpreadSheetApi {
  constructor (
    private readonly googleCredentials: Credentials,
    private readonly spreadSheetId: string,
    private readonly spreadSheetTabName: string,
    private readonly fields: string[]

  ) {}

  public async authentication (): Promise<GoogleSpreadSheetApi.Authentication.Result> {
    try {
      const doc = new GoogleSpreadsheet(this.spreadSheetId)
      const credentials = this.googleCredentials

      await doc.useServiceAccountAuth(credentials)

      await doc.loadInfo()
      const sheetRange = doc.sheetsByTitle[this.spreadSheetTabName]

      if (!sheetRange) {
        const newRange = await doc.addSheet({
          title: this.spreadSheetTabName
        })
        await newRange.setHeaderRow(["ID", ...this.fields])
        return right(newRange)
      }

      return right(sheetRange)
    } catch (error: any) {
      return left(new ServerError(500, error.message))
    }
  }

  public async loadValues (): Promise<GoogleSpreadSheetApi.LoadValues.Result> {
    const range = await this.authentication()

    if (range.isLeft()) {
      return left(range.value)
    }

    const values = await range.value.getRows()

    const result: any[] = []

    values.forEach((item) => {
      const json: ObjectData = {}
      const id = !item.ID ? crypto.randomUUID() : item.ID
      json.id = id
      for (const field of this.fields) {
        if (item[field]) {
          json[field.toLowerCase()] = item[field]
        }
      }
      result.push(json)
    })
    return right(result)
  }

  public async addValues ({ values }: GoogleSpreadSheetApi.AddValues.Params): Promise<GoogleSpreadSheetApi.AddValues.Result> {
    const sheetRange = await this.authentication()

    if (sheetRange.isLeft()) {
      return left(sheetRange.value)
    }

    values.ID = crypto.randomUUID()
    const row = await sheetRange.value.addRow(values)
    return right(row.ID)
  }

  public async deleteValues ({ id }: GoogleSpreadSheetApi.DeleteValues.Params): Promise<GoogleSpreadSheetApi.DeleteValues.Result> {
    const sheetRange = await this.authentication()

    if (sheetRange.isLeft()) {
      return left(sheetRange.value)
    }
    const values = await sheetRange.value.getRows()

    let ok = false
    values.forEach((row) => {
      if (row.ID === id) {
        void row.delete()
        ok = true
      }
    })

    if (!ok) return left(new ServerError(404, "Not found"))
    return right(ok)
  }

  public async updateValues ({ values }: GoogleSpreadSheetApi.UpdateValues.Params): Promise<GoogleSpreadSheetApi.UpdateValues.Result> {
    const sheetRange = await this.authentication()

    if (sheetRange.isLeft()) {
      return left(sheetRange.value)
    }

    const list = await sheetRange.value.getRows()
    let register: GoogleSpreadsheetRow | undefined

    if (!values.ID) {
      return left(new ServerError(400, "ID is required"))
    }

    list.forEach((item) => {
      if (item.ID === values.ID) {
        register = item
      }
    })

    if (!register) {
      return left(new ServerError(404, "Not found"))
    }
    for (const [key, value] of Object.entries(values)) {
      if (register[key]) {
        register[key] = value || register[key]
      }
    }

    await register.save()

    return right(register.ID)
  }
}
