/* eslint-disable import/first */

import * as dotenv from "dotenv"
dotenv.config()
import figlet from "figlet"
import { env } from "../shared/env"
import { app } from "./app"

app.listen(env.port, () => {
  console.log(figlet.textSync("Spreadsheet Connector"))
  console.log("server is running in port:", env.port)
})
