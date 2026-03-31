import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'

// Modules
import { ProductsModule } from './modules/products/products.module'
import { AuthModule } from './modules/auth/auth.module'
import { CartModule } from './modules/cart/cart.module'
import { UsersModule } from './modules/users/users.module'
import { AddressesModule } from './modules/addresses/addresses.module'
import { OrdersModule } from './modules/orders/orders.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { ReviewsModule } from './modules/reviews/reviews.module'
import { ShopsModule } from './modules/shops/shops.module'
import { CouponsModule } from './modules/coupons/coupons.module'
import { ActivitiesModule } from './modules/activities/activities.module'
import { AdsModule } from './modules/ads/ads.module'
import { PaymentsModule } from './modules/payments/payments.module'
import { LogisticsModule } from './modules/logistics/logistics.module'
import { RegionsModule } from './modules/regions/regions.module'
import { FreightModule } from './modules/freight/freight.module'

import { SharedModule } from './shared/shared.module'
import { DatabaseModule } from './database/database.module'
import { RedisCacheModule } from './modules/cache/cache.module'
import { BullQueueModule } from './modules/bull/bull.module'

// Common
import { GlobalExceptionFilter } from './filters/http-exception.filter'
import { QueryFailedFilter } from './filters/query-failed.filter'
import { TransformInterceptor } from './interceptors/transform.interceptor'
import { LoggingInterceptor } from './interceptors/logging.interceptor'
import { ThrottleConfig } from './config/configuration'

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ThrottleConfig]
    }),

    // Throttler - Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100
      }
    ]),

    // Shared Module (Config + others)
    SharedModule,

    // Database
    DatabaseModule,

    // Cache
    RedisCacheModule,

    // Bull Queue
    BullQueueModule,

    // Feature Modules
    ProductsModule,
    AuthModule,
    CartModule,
    UsersModule,
    AddressesModule,
    OrdersModule,
    CategoriesModule,
    ReviewsModule,
    ShopsModule,
    CouponsModule,
    ActivitiesModule,
    AdsModule,
    PaymentsModule,
    LogisticsModule,
    RegionsModule,
    FreightModule
  ],
  controllers: [],
  providers: [
    // Global Guards
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },

    // Global Filters
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: QueryFailedFilter
    },

    // Global Interceptors
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ]
})
export class AppModule {}
