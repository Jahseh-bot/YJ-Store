import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class ApiResponseDto<T> {
  @ApiProperty()
  success: boolean

  @ApiProperty()
  data: T

  @ApiProperty()
  timestamp: string

  @ApiPropertyOptional()
  message?: string
}

export class ErrorResponseDto {
  @ApiProperty()
  statusCode: number

  @ApiProperty()
  timestamp: string

  @ApiProperty()
  path: string

  @ApiProperty()
  method: string

  @ApiProperty()
  message: string | string[]

  @ApiProperty()
  error: string
}
