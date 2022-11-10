import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import { routes } from "./routes"

const app = express()

app.use(cors())
app.options("*", cors())
app.use(express.json())
app.use(routes)

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    return response.status(500).json({
      status: 500,
      message: `Internal server error - ${err.message}`
    })
  }
)

export { app }
