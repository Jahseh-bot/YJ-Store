export interface IRedisConfig {
  host: string
  port: number
  password?: string
  db: number
}

export interface IJwtConfig {
  secret: string
  expiration: string
  refreshSecret: string
  refreshExpiration: string
}

export interface IAppConfig {
  nodeEnv: string
  port: number
  name: string
  description: string
  corsOrigins: string[]
}
