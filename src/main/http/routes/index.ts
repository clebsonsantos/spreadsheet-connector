import { Router, Request, Response } from "express"
import { LoadValuesController } from "../../../presentation/controllers/load-values-controller"
import { LoadValuesDataSheet } from "../../../usecases/load-values-datasheet"

const routes = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
routes.post("/spreadsheet/list", async (request: Request, response: Response) => {
  const loadService = new LoadValuesDataSheet()
  const loadDatasheetValues = new LoadValuesController(loadService)
  const result = await loadDatasheetValues.handle(request)
  return response.status(result.statusCode).json(result.data)
})

export { routes }
