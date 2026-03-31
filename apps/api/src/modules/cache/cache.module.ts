import { Module, Global } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        const redisConfig = configService.get('redis')
        const cacheConfig = configService.get('cache')

        const store = await redisStore({
          socket: {
            host: redisConfig.host,
            port: redisConfig.port
          },
          password: redisConfig.password,
          ttl: cacheConfig.ttl
        })

        return {
          store,
          ttl: cacheConfig.ttl,
          max: 100
        }
      }
    })
  ],
  exports: [CacheModule]
})
export class RedisCacheModule {}
