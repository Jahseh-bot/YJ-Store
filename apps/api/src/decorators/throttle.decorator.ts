import { SetMetadata } from '@nestjs/common'

export const THROTTLE_KEY = 'throttle'
export const THROTTLE_SKIP_KEY = 'throttleSkip'

export const Throttle = (options?: { ttl?: number; limit?: number }) =>
  SetMetadata(THROTTLE_KEY, options || { ttl: 60000, limit: 100 })

export const ThrottleSkip = () => SetMetadata(THROTTLE_SKIP_KEY, true)

export const SkipThrottle = () => SetMetadata(THROTTLE_SKIP_KEY, true)
