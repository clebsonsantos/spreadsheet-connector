/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, Request, Response } from "express"
import { LoadValuesController, AddValuesController, UpdateValuesController, DeleteValuesController } from "../../../presentation/controllers"
import { LoadValuesDataSheet, AddValuesDataSheet, UpdateValuesDataSheet, DeleteValuesDataSheet } from "../../../usecases"

const routes = Router()

routes.post("/spreadsheet/list", async (request: Request, response: Response) => {
  const loadService = new LoadValuesDataSheet()
  const loadDatasheetValues = new LoadValuesController(loadService)
  const result = await loadDatasheetValues.handle(request)
  return response.status(result.statusCode).json(result.data)
})

routes.post("/spreadsheet/add", async (request: Request, response: Response) => {
  const addService = new AddValuesDataSheet()
  const addDatasheetValues = new AddValuesController(addService)
  const result = await addDatasheetValues.handle(request)
  return response.status(result.statusCode).json(result.data)
})

routes.post("/spreadsheet/update", async (request: Request, response: Response) => {
  const updateService = new UpdateValuesDataSheet()
  const updateDatasheetValues = new UpdateValuesController(updateService)
  const result = await updateDatasheetValues.handle(request)
  return response.status(result.statusCode).json(result.data)
})

routes.post("/spreadsheet/delete", async (request: Request, response: Response) => {
  const deleteService = new DeleteValuesDataSheet()
  const deleteDatasheetValues = new DeleteValuesController(deleteService)
  const result = await deleteDatasheetValues.handle(request)
  return response.status(result.statusCode).json(result.data)
})

export { routes }
