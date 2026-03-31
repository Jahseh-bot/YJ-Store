import { Module } from '@nestjs/common'
import { ProductsModule } from './modules/products/products.module'
import { AuthModule } from './modules/auth/auth.module'
import { CartModule } from './modules/cart/cart.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    ProductsModule,
    AuthModule,
    CartModule,
    UsersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
