import { DeleteValues } from "../contracts/usecases"
import { left, right } from "../main/shared"

export class DeleteValuesDataSheet implements DeleteValues {
  async execute ({ auth, id }: DeleteValues.Params): Promise<DeleteValues.Result> {
    const values = await auth.deleteValues({ id })
    return values.isLeft()
      ? left(values.value)
      : right(values.value)
  }
}
