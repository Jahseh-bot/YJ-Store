import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsPhoneNumber
} from 'class-validator'

export class CreateAddressDto {
  @ApiProperty({ description: 'Receiver name' })
  @IsString()
  receiverName: string

  @ApiProperty({ description: 'Phone number' })
  @IsString()
  phone: string

  @ApiPropertyOptional({ description: 'Province' })
  @IsOptional()
  @IsString()
  province?: string

  @ApiPropertyOptional({ description: 'City' })
  @IsOptional()
  @IsString()
  city?: string

  @ApiPropertyOptional({ description: 'District' })
  @IsOptional()
  @IsString()
  district?: string

  @ApiPropertyOptional({ description: 'Street' })
  @IsOptional()
  @IsString()
  street?: string

  @ApiProperty({ description: 'Detailed address' })
  @IsString()
  address: string

  @ApiPropertyOptional({ description: 'Postal code' })
  @IsOptional()
  @IsString()
  postalCode?: string

  @ApiPropertyOptional({ description: 'Set as default address' })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean

  @ApiPropertyOptional({ description: 'Address tag (e.g., Home, Work)' })
  @IsOptional()
  @IsString()
  tag?: string
}

export class UpdateAddressDto extends CreateAddressDto {}
