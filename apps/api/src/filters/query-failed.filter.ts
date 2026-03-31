import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger
} from '@nestjs/common'
import { Request, Response } from 'express'
import { QueryFailedError } from 'typeorm'

interface QueryError extends QueryFailedError {
  constraint?: string
  detail?: string
}

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
  private readonly logger = new Logger(QueryFailedFilter.name)

  catch(exception: QueryError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status = 400
    const constraint = exception.constraint
    let message: string

    // Handle specific constraint errors
    if (constraint?.includes('UQ_')) {
      message = 'A record with this value already exists'
    } else if (constraint?.includes('FK_')) {
      message = 'This operation violates a foreign key constraint'
    } else if (constraint?.includes('CK_')) {
      message = 'This operation violates a check constraint'
    } else if (exception.detail?.includes('already exists')) {
      message = exception.detail
    } else if (exception.detail?.includes('does not exist')) {
      message = exception.detail
    } else {
      message = 'Database query failed'
    }

    this.logger.error(
      `Query failed: ${exception.message}`,
      exception.stack
    )

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      error: 'QueryFailedError'
    })
  }
}
