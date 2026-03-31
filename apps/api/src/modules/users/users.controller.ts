import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { User } from './user.entity'
import { UserRole } from './user-role.enum'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  private users: User[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      passwordHash: 'hashed_password',
      role: UserRole.ADMIN,
      firstName: 'Admin',
      lastName: 'User',
      phone: '1234567890',
      avatarUrl: undefined,
      isActive: true,
      lastLoginAt: undefined,
      cartItems: [],
      orders: [],
      favorites: [],
      refreshToken: undefined,
      refreshTokenExpiresAt: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined
    }
  ]

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id', ParseIntPipe) id: number): User | undefined {
    const user = this.users.find(u => u.id === id)
    if (user) {
      const { passwordHash, refreshToken, ...result } = user
      return result as User
    }
    return undefined
  }
}
