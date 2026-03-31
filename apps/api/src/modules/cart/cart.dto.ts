import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, Min } from 'class-validator'

export class AddToCartDto {
  @ApiProperty()
  @IsNumber()
  productId: number

  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number
}
