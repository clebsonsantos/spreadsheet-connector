import { UpdateValues } from "../contracts/usecases"
import { left, right } from "../main/shared"

export class UpdateValuesDataSheet implements UpdateValues {
  async execute ({ auth, data }: UpdateValues.Params): Promise<UpdateValues.Result> {
    const values = await auth.updateValues({ values: data })
    return values.isLeft()
      ? left(values.value)
      : right(values.value)
  }
}
