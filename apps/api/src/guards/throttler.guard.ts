import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { THROTTLE_KEY, THROTTLE_SKIP_KEY } from '../decorators/throttle.decorator'

@Injectable()
export class ThrottlerGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // Skip throttling if decorated with @ThrottleSkip
    const skipThrottle = this.reflector.getAllAndOverride<boolean>(
      THROTTLE_SKIP_KEY,
      [context.getHandler(), context.getClass()]
    )

    if (skipThrottle) {
      return true
    }

    // Get throttle settings from decorator or use default
    const throttleSetting = this.reflector.getAllAndOverride<{ ttl: number; limit: number }>(
      THROTTLE_KEY,
      [context.getHandler(), context.getClass()]
    )

    // For now, allow the request - actual throttling is handled by @nestjs/throttler
    // This guard can be extended to apply custom throttling logic
    return true
  }
}
