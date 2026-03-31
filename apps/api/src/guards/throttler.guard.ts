import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Throttle, ThrottleSkip } from '../decorators/throttle.decorator'

@Injectable()
export class ThrottlerGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // Skip throttling if decorated with @ThrottleSkip
    const skipThrottle = this.reflector.getAllAndOverride<boolean>(
      ThrottleSkip.KEY,
      [context.getHandler(), context.getClass()]
    )

    if (skipThrottle) {
      return true
    }

    // Get throttle settings from decorator or use default
    const throttleSetting = this.reflector.getAllAndOverride<{ ttl: number; limit: number }>(
      Throttle.KEY,
      [context.getHandler(), context.getClass()]
    )

    // For now, allow the request - actual throttling is handled by @nestjs/throttler
    // This guard can be extended to apply custom throttling logic
    return true
  }
}
