# Marketplace API

## Tech Stack
- **Framework**: NestJS 10
- **Language**: TypeScript
- **Validation**: class-validator + class-transformer
- **API Docs**: Swagger (@nestjs/swagger)

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

### API Endpoints
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `POST /api/auth/login` - Login
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `DELETE /api/cart/:id` - Remove from cart

### Swagger Docs
- Available at `/api/docs`
- Use `@ApiBearerAuth()` for protected routes
