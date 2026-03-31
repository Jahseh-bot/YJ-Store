import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsString, IsNumber, IsOptional, Min } from 'class-validator'

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number

  @ApiProperty()
  @IsString()
  image: string

  @ApiProperty()
  @IsNumber()
  @Min(0)
  stock: number

  @ApiProperty()
  @IsNumber()
  categoryId: number
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
