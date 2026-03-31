import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { LoginDto } from './auth.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  login(@Body() dto: LoginDto) {
    // Mock login - in production, validate against database
    return {
      user: {
        id: 1,
        username: dto.username,
        email: `${dto.username}@example.com`
      },
      token: 'mock-jwt-token-' + Date.now()
    }
  }
}
