import { LoadValue } from "../contracts/usecases/load-values"
import { left, right } from "../main/shared"

export class LoadValuesDataSheet implements LoadValue {
  async execute ({ auth }: LoadValue.Params): Promise<LoadValue.Result> {
    const values = await auth.loadValues()
    return values.isLeft()
      ? left(values.value)
      : right(values.value)
  }
}
