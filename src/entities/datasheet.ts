
type DataSheetValue = Omit<DataSheet, "getValue" | "isValid">

export class DataSheet {
  public data!: {
    [key: string]: string
  }

  constructor (params: DataSheetValue) {
    Object.assign(this, params)
    Object.freeze(this)
  }

  public isValid (): boolean {
    if (
      !Object.values(this.data).length
    ) {
      return false
    }
    return true
  }

  public getValue (): DataSheetValue {
    return this
  }
}
