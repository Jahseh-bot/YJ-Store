import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, IsInt, Min } from 'class-validator'
import { Transform, Type } from 'class-transformer'

export class IdDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  id: number
}

export class PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1

  @ApiPropertyOptional({ description: 'Page size', default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number = 20
}

export class StatusQueryDto {
  @ApiPropertyOptional({ description: 'Status filter' })
  @IsOptional()
  @IsString()
  status?: string
}

export class DateRangeQueryDto {
  @ApiPropertyOptional({ description: 'Start date (ISO format)' })
  @IsOptional()
  @IsString()
  startDate?: string

  @ApiPropertyOptional({ description: 'End date (ISO format)' })
  @IsOptional()
  @IsString()
  endDate?: string
}

export class ListQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Keyword search' })
  @IsOptional()
  @IsString()
  keyword?: string

  @ApiPropertyOptional({ description: 'Sort field' })
  @IsOptional()
  @IsString()
  sort?: string

  @ApiPropertyOptional({ description: 'Sort order (asc/desc)' })
  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc' = 'desc'
}
