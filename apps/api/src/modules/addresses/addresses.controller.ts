import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth
} from '@nestjs/swagger'
import { AddressesService } from './addresses.service'
import { Address } from './address.entity'
import { CurrentUser, CurrentUserData } from '../../decorators/current-user.decorator'
import { CreateAddressDto, UpdateAddressDto } from './addresses.dto'

@ApiTags('Addresses')
@Controller('addresses')
@ApiBearerAuth()
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all addresses for current user' })
  async findAll(@CurrentUser() user: CurrentUserData): Promise<Address[]> {
    return this.addressesService.findAllByUser(user.id)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get address by ID' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserData
  ): Promise<Address> {
    return this.addressesService.findOne(id, user.id)
  }

  @Post()
  @ApiOperation({ summary: 'Create new address' })
  async create(
    @Body() createAddressDto: CreateAddressDto,
    @CurrentUser() user: CurrentUserData
  ): Promise<Address> {
    return this.addressesService.create(user.id, createAddressDto)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update address' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
    @CurrentUser() user: CurrentUserData
  ): Promise<Address> {
    return this.addressesService.update(id, user.id, updateAddressDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete address' })
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserData
  ): Promise<void> {
    return this.addressesService.delete(id, user.id)
  }

  @Put(':id/default')
  @ApiOperation({ summary: 'Set address as default' })
  async setDefault(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserData
  ): Promise<Address> {
    return this.addressesService.setDefault(id, user.id)
  }
}
