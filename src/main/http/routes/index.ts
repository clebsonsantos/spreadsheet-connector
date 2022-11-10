/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, Request, Response } from "express"
import { LoadValuesController, AddValuessController } from "../../../presentation/controllers"
import { LoadValuesDataSheet, AddValuesDataSheet } from "../../../usecases"

const routes = Router()

routes.post("/spreadsheet/list", async (request: Request, response: Response) => {
  const loadService = new LoadValuesDataSheet()
  const loadDatasheetValues = new LoadValuesController(loadService)
  const result = await loadDatasheetValues.handle(request)
  return response.status(result.statusCode).json(result.data)
})

routes.post("/spreadsheet/add", async (request: Request, response: Response) => {
  const addService = new AddValuesDataSheet()
  const loadDatasheetValues = new AddValuessController(addService)
  const result = await loadDatasheetValues.handle(request)
  return response.status(result.statusCode).json(result.data)
})

export { routes }
