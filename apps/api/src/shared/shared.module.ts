import { Module, Global } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import {
  AppConfig,
  DatabaseConfig,
  RedisConfig,
  JwtConfig,
  ThrottleConfig,
  UploadConfig,
  CacheConfig,
  BullConfig,
  AdminConfig
} from '../config/configuration'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        AppConfig,
        DatabaseConfig,
        RedisConfig,
        JwtConfig,
        ThrottleConfig,
        UploadConfig,
        CacheConfig,
        BullConfig,
        AdminConfig
      ],
      envFilePath: ['.env.example', '.env']
    })
  ],
  exports: [ConfigModule]
})
export class SharedModule {}
