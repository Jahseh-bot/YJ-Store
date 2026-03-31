import { registerAs } from '@nestjs/config'
import { JwtOptionsFactory } from '@nestjs/jwt'
import { redisStore } from 'cache-manager-redis-yet'

export const AppConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  name: process.env.APP_NAME || 'Marketplace API',
  description: process.env.APP_DESCRIPTION || 'Marketplace API Backend',
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || [
    'http://localhost:3001',
    'http://localhost:3002'
  ]
}))

export const DatabaseConfig = registerAs('database', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'marketplace',
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true'
}))

export const RedisConfig = registerAs('redis', () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB, 10) || 0
}))

export const JwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'default-secret-change-me',
  expiration: process.env.JWT_EXPIRATION || '7d',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-change-me',
  refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '30d'
}))

export const ThrottleConfig = registerAs('throttle', () => ({
  ttl: parseInt(process.env.THROTTLE_TTL, 10) || 60000,
  limit: parseInt(process.env.THROTTLE_LIMIT, 10) || 100
}))

export const UploadConfig = registerAs('upload', () => ({
  maxFileSize: process.env.UPLOAD_MAX_FILE_SIZE || '5mb',
  dest: process.env.UPLOAD_DEST || './uploads'
}))

export const CacheConfig = registerAs('cache', () => ({
  ttl: parseInt(process.env.CACHE_TTL, 10) || 3600000
}))

export const BullConfig = registerAs('bull', () => ({
  redis: {
    host: process.env.BULL_REDIS_HOST || 'localhost',
    port: parseInt(process.env.BULL_REDIS_PORT, 10) || 6379
  }
}))

export const AdminConfig = registerAs('admin', () => ({
  email: process.env.ADMIN_EMAIL || 'admin@marketplace.com',
  password: process.env.ADMIN_PASSWORD || 'Admin@123456'
}))
