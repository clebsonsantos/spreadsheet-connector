/* eslint-disable import/first */

import * as dotenv from "dotenv"
dotenv.config()
import { env } from "../shared/env"
import { app } from "./app"

app.listen(env.port, () => {
  console.log("online server in port ", env.port)
})
