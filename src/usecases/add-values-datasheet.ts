import { AddValues } from "../contracts/usecases"
import { DataSheet } from "../entities"
import { left, right } from "../main/shared"

export class AddValuesDataSheet implements AddValues {
  async execute ({ auth, data }: AddValues.Params): Promise<AddValues.Result> {
    const datasheet = new DataSheet({ data })

    if (!datasheet.isValid()) {
      return left(new Error("Invalid values"))
    }

    const values = await auth.addValues({ values: datasheet.data })
    return values.isLeft()
      ? left(values.value)
      : right(values.value)
  }
}
