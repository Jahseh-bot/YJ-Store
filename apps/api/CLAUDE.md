# Marketplace API

## Tech Stack
- **Framework**: NestJS 10
- **Language**: TypeScript
- **Validation**: class-validator + class-transformer
- **API Docs**: Swagger (@nestjs/swagger)
- **ORM**: TypeORM + PostgreSQL
- **Cache**: Redis (ioredis + cache-manager-redis-yet)
- **Auth**: JWT + Passport
- **Queue**: Bull (Redis-based)
- **API Docs**: Swagger/OpenAPI

## Project Structure

```
src/
├── config/                    # 配置文件
├── database/                 # 数据库相关
│   ├── migrations/          # 迁移文件
│   └── seeds/               # 种子数据
├── common/                   # 公共模块
│   ├── dto/                 # 通用DTO
│   ├── entities/            # 基础实体
│   └── interfaces/          # 通用接口
├── decorators/               # 自定义装饰器
├── filters/                  # 异常过滤器
├── guards/                   # 守卫
├── interceptors/             # 拦截器
└── modules/                  # 功能模块
    ├── addresses/           # 收货地址
    ├── auth/                 # 认证
    ├── cache/                # 缓存
    ├── cart/                 # 购物车
    ├── categories/           # 分类
    ├── orders/               # 订单
    ├── products/             # 商品
    ├── users/                # 用户
    └── bull/                 # 队列
```

## Conventions

### Module Structure
- Each feature has its own module in `src/modules/`
- Structure: `*.controller.ts`, `*.module.ts`, `*.dto.ts`, `*.entity.ts`

### DTOs & Validation
- Use `class-validator` decorators for input validation
- Use `class-transformer` for DTO transformation
- Enable `whitelist: true` in ValidationPipe to strip non-whitelisted props

### API Design
- Global prefix: `/api`
- Use `@ApiTags()` for Swagger grouping
- Return meaningful HTTP status codes

### Controllers
- Use `@Get`, `@Post`, `@Put`, `@Delete` decorators
- Use `@Param()`, `@Query()`, `@Body()` for parameter binding
- Swagger docs via `@ApiOperation()`, `@ApiResponse()`

### Services
- Business logic in services, not controllers
- Use `constructor` injection for dependencies

### TypeScript
- Strict mode enabled
- Avoid `any`, use proper interfaces/types
- Use optional chaining (`?.`) and nullish coalescing (`??`)

## Available Skills

### Development Commands
```bash
pnpm dev          # 开发模式 (watch)
pnpm build       # 构建生产版本
pnpm start       # 生产运行
pnpm lint        # 代码检查
pnpm test        # 运行测试
pnpm db:migrate  # 运行数据库迁移
pnpm db:seed     # 运行种子数据
pnpm db:generate # 生成迁移文件
```

### API Endpoints
- `GET /api/docs` - Swagger API文档
- `GET /api/products` - 商品列表
- `GET /api/products/:id` - 商品详情
- `POST /api/auth/login` - 登录
- `GET /api/cart` - 购物车
- `POST /api/cart` - 添加购物车
- `DELETE /api/cart/:id` - 删除购物车商品

### Database
- PostgreSQL on localhost:5432
- Redis on localhost:6379

## Settings

See `settings.json` for:
- Command permissions
- Hook configurations
- Code review rules
- Commit conventions

## Best Practices

1. **Entity Design**: All entities extend `BaseEntity` with `id`, `createdAt`, `updatedAt`, `deletedAt`
2. **Soft Delete**: Use `deletedAt` for soft deletes, never hard delete
3. **Configuration**: Use `@nestjs/config` with `registerAs` for type-safe config
4. **Error Handling**: Use `NotFoundException`, `BadRequestException`, etc.
5. **API Versioning**: Consider `/api/v1/` prefix for future versioning
