
type DataSheetValue = Omit<DataSheet, "getValue" | "isValid">

type ObjectData = {
  [key: string]: string
}
export class DataSheet {
  public data!: ObjectData

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
