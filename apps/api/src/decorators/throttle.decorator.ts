import { SetMetadata } from '@nestjs/common'

export const Throttle = SetMetadata<string, { ttl: number; limit: number }>('throttle', null)
export const ThrottleSkip = SetMetadata<boolean>('throttleSkip', null)

export const SkipThrottle = () => SetMetadata('throttleSkip', true)
