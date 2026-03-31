import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Address } from './address.entity'

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>
  ) {}

  async findAllByUser(userId: number): Promise<Address[]> {
    return this.addressRepository.find({
      where: { userId },
      order: { isDefault: 'DESC', createdAt: 'DESC' }
    })
  }

  async findOne(id: number, userId: number): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id, userId }
    })

    if (!address) {
      throw new NotFoundException('Address not found')
    }

    return address
  }

  async create(userId: number, data: Partial<Address>): Promise<Address> {
    // If this is the first address or isDefault is true, set other addresses to non-default
    if (data.isDefault) {
      await this.clearDefault(userId)
    }

    const address = this.addressRepository.create({
      ...data,
      userId
    })

    return this.addressRepository.save(address)
  }

  async update(id: number, userId: number, data: Partial<Address>): Promise<Address> {
    const address = await this.findOne(id, userId)

    if (data.isDefault) {
      await this.clearDefault(userId)
    }

    Object.assign(address, data)
    return this.addressRepository.save(address)
  }

  async delete(id: number, userId: number): Promise<void> {
    const address = await this.findOne(id, userId)
    await this.addressRepository.remove(address)
  }

  async setDefault(id: number, userId: number): Promise<Address> {
    await this.clearDefault(userId)

    const address = await this.findOne(id, userId)
    address.isDefault = true
    return this.addressRepository.save(address)
  }

  private async clearDefault(userId: number): Promise<void> {
    await this.addressRepository.update(
      { userId, isDefault: true },
      { isDefault: false }
    )
  }
}
