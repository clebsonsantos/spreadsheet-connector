import { AddValues } from "../contracts/usecases"
import { left, right } from "../main/shared"

export class AddValuesDataSheet implements AddValues {
  async execute ({ auth, data }: AddValues.Params): Promise<AddValues.Result> {
    const values = await auth.addValues({ values: data })
    return values.isLeft()
      ? left(values.value)
      : right(values.value)
  }
}
