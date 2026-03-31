export interface IPaginationOptions {
  page: number
  pageSize: number
}

export interface IPaginationMeta {
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface IPaginatedResult<T> {
  data: T[]
  meta: IPaginationMeta
}

export interface IApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  meta?: IPaginationMeta
}

export interface IErrorResponse {
  statusCode: number
  message: string | string[]
  error: string
  timestamp: string
  path: string
}
