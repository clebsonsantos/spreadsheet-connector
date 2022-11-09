import { SpreadSheet } from "../../infra/gateways/spreadsheet"

async function run (): Promise<void> {
  const auth = new SpreadSheet({
    client_email: "",
    private_key: ""
  }, "teste", "Test")
  const result = await auth.authentication()
  result.isLeft() && console.log(result.value)
  result.isRight() && console.log(result.value)
}
void run()
