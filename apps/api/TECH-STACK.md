# Marketplace API - 技术栈与最佳实践

## 引入的依赖库

### 核心框架
- `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express` - NestJS 核心
- `reflect-metadata`, `rxjs` - 运行时依赖

### 数据库层
- `@nestjs/typeorm` - TypeORM 集成
- `typeorm` - ORM 框架
- `pg` - PostgreSQL 驱动

### 缓存层
- `@nestjs/cache-manager` - 缓存抽象层
- `cache-manager-redis-yet` - Redis 缓存实现
- `ioredis` - Redis 客户端

### 认证授权
- `@nestjs/jwt` - JWT 模块
- `@nestjs/passport` - Passport 集成
- `passport`, `passport-jwt`, `passport-local` - 认证策略
- `bcrypt` - 密码加密

### 限流与安全
- `@nestjs/throttler` - 接口限流
- `helmet` - 安全头 (可选)

### 消息队列
- `@nestjs/bull` - Bull 队列集成
- `bull` - 异步任务队列

### 实时通信
- `@nestjs/websockets`, `@nestjs/platform-socket.io` - WebSocket 支持
- `socket.io` - 实时通信库

### 配置管理
- `@nestjs/config` - 配置模块
- `js-yaml` - YAML 配置解析

### API 文档
- `@nestjs/swagger` - Swagger/OpenAPI 文档

### 数据验证
- `class-validator`, `class-transformer` - DTO 验证与转换

### HTTP 客户端
- `axios` - HTTP 请求库

### 开发工具

#### ESLint & Prettier
- `eslint` - 代码检查
- `@typescript-eslint/eslint-plugin` - TS ESLint 插件
- `@typescript-eslint/parser` - TS 解析器
- `eslint-config-prettier` - Prettier ESLint 兼容
- `eslint-plugin-prettier` - Prettier ESLint 插件
- `prettier` - 代码格式化

#### Git Hooks
- `husky` - Git hooks
- `lint-staged` - staged 文件检查
- `@commitlint/cli`, `@commitlint/config-conventional` - Commit 规范

#### 测试
- `jest` - 测试框架
- `ts-jest` - TS Jest 支持
- `@nestjs/testing` - NestJS 测试工具

#### TypeORM CLI
- `typeorm-ts-node-esm` - TypeORM CLI 支持
- `tsconfig-paths` - TS 路径映射

---

## 项目目录结构

```
src/
├── config/                    # 配置模块
│   └── configuration.ts       # 配置文件定义
├── database/                  # 数据库相关
│   ├── data-source.ts        # TypeORM 数据源
│   ├── database.module.ts    # 数据库模块
│   ├── migrations/           # 迁移文件
│   └── seeds/                # 种子数据
├── common/                    # 公共模块
│   ├── dto/                  # 通用 DTO
│   │   ├── pagination.dto.ts
│   │   └── response.dto.ts
│   ├── entities/             # 基础实体
│   │   └── base.entity.ts
│   └── interfaces/           # 通用接口
├── decorators/               # 自定义装饰器
│   ├── current-user.decorator.ts
│   ├── roles.decorator.ts
│   └── throttle.decorator.ts
├── filters/                  # 异常过滤器
│   ├── http-exception.filter.ts
│   └── query-failed.filter.ts
├── guards/                   # 守卫
│   └── throttle.guard.ts
├── interceptors/             # 拦截器
│   ├── logging.interceptor.ts
│   └── transform.interceptor.ts
├── modules/                  # 功能模块
│   ├── addresses/            # 收货地址
│   ├── auth/                 # 认证
│   ├── cache/                # 缓存模块
│   ├── cart/                 # 购物车
│   ├── categories/           # 商品分类
│   ├── orders/               # 订单
│   ├── products/             # 商品
│   ├── users/                # 用户
│   └── bull/                 # 队列模块
├── shared/                    # 共享模块
│   └── shared.module.ts
├── app.module.ts
└── main.ts
```

---

## 最佳实践

### 1. 模块设计
- 每个功能模块独立，包含 `controller`, `service`, `entity`, `dto`
- 使用 `@Global()` 标记全局模块 (如 ConfigModule, DatabaseModule)
- 导出时包含类型信息

### 2. DTO 设计
- 使用 `class-validator` 进行输入验证
- 使用 `class-transformer` 进行类型转换
- DTO 分 `CreateDto` 和 `UpdateDto`

### 3. 实体设计
- 所有实体继承 `BaseEntity`
- 使用 `SoftDelete` (通过 `deletedAt`)
- 敏感字段使用 `@Exclude()` 排除序列化

### 4. 配置管理
- 使用 `@nestjs/config` + `registerAs` 进行配置
- 配置按功能模块分组 (app, database, redis, jwt 等)
- 敏感配置通过环境变量注入

### 5. 认证授权
- JWT Token 认证
- Role-Based Access Control (RBAC)
- 使用 `@CurrentUser()` 获取当前用户

### 6. 错误处理
- `GlobalExceptionFilter` - 全局异常过滤
- `QueryFailedFilter` - 数据库异常处理
- 统一错误响应格式

### 7. 日志与监控
- `LoggingInterceptor` - HTTP 请求日志
- 请求追踪 (timestamp, path, method)

### 8. API 设计
- RESTful API 设计
- Swagger/OpenAPI 文档
- 统一响应格式 `{ success, data, timestamp, path }`

### 9. Git Commit 规范
```
feat: 新功能
fix: 修复bug
docs: 文档变更
style: 代码格式
refactor: 重构
perf: 性能优化
test: 测试
build: 构建
ci: CI配置
chore: 其他
```

---

## 环境变量

参考 `.env.example` 文件，复制为 `.env` 并配置：

```bash
cp .env.example .env
```

### 必需的环境变量

| 变量 | 说明 | 示例 |
|------|------|------|
| `DB_HOST` | 数据库地址 | localhost |
| `DB_PORT` | 数据库端口 | 5432 |
| `DB_USERNAME` | 数据库用户名 | postgres |
| `DB_PASSWORD` | 数据库密码 | postgres |
| `DB_DATABASE` | 数据库名 | marketplace |
| `JWT_SECRET` | JWT 密钥 | your-secret |
| `REDIS_HOST` | Redis 地址 | localhost |
| `REDIS_PORT` | Redis 端口 | 6379 |

---

## 常用命令

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 生产运行
pnpm start:prod

# 运行测试
pnpm test

# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 数据库迁移
pnpm db:migrate

# 生成迁移
pnpm db:generate

# 初始化种子数据
pnpm db:seed
```

---

## API 文档

启动服务后访问: `http://localhost:3000/api/docs`
