import { ServerError, UnauthorazedError } from "../errors"

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}
export const ok = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 200,
  data
})

export const badRequest = (error: Error): HttpResponse<any> => ({
  statusCode: 400,
  data: {
    message: error.message
  }
})

export const unauthorized = (error: Error): HttpResponse<any> => ({
  statusCode: 401,
  data: {
    type: (new UnauthorazedError()).message,
    message: error.message
  }
})

export const serverError = (error: Error): HttpResponse<any> => ({
  statusCode: 500,
  data: {
    message: (new ServerError(error)).message
  }
})
