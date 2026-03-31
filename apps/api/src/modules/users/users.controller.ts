import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { User } from './user.entity'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  private users: User[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      passwordHash: 'hashed_password'
    }
  ]

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id', ParseIntPipe) id: number): User | undefined {
    const user = this.users.find(u => u.id === id)
    if (user) {
      const { passwordHash, ...result } = user
      return result as User
    }
    return undefined
  }
}
