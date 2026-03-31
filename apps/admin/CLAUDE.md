# Marketplace Admin Panel

## Tech Stack
- **Framework**: Vue 3 (Composition API + `<script setup>`)
- **Build Tool**: Vite
- **UI Library**: Ant Design Vue 4
- **State Management**: Pinia
- **Router**: Vue Router 4
- **Type Safety**: TypeScript strict mode

## Project Structure

```
src/
├── api/                      # API请求
│   ├── modules/              # 按模块组织的API
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── products.ts
│   │   ├── orders.ts
│   │   └── ...
│   └── request.ts            # Axios封装
├── assets/                   # 静态资源
│   └── css/
│       └── main.css
├── components/               # 公共组件
│   ├── common/               # 通用组件
│   ├── form/                 # 表单组件
│   └── table/                # 表格组件
├── layouts/                  # 布局
│   ├── BackendLayout.vue    # 后台主布局
│   └── BlankLayout.vue       # 空白布局
├── pages/                    # 页面
│   ├── dashboard/            # 工作台
│   ├── users/                # 用户管理
│   ├── merchants/             # 商家管理
│   ├── products/             # 商品管理
│   │   ├── list.vue         # 商品列表
│   │   ├── create.vue       # 发布商品
│   │   └── review.vue        # 商品审核
│   ├── categories/           # 类目管理
│   ├── orders/               # 订单管理
│   ├── refunds/              # 售后管理
│   ├── coupons/              # 优惠券管理
│   ├── activities/           # 活动管理
│   ├── ads/                  # 广告管理
│   ├── stats/                # 数据报表
│   ├── settings/             # 系统设置
│   └── auth/                 # 认证相关
│       ├── login.vue
│       └── password.vue
├── router/                   # 路由
│   └── index.ts
├── stores/                   # Pinia状态库
│   ├── auth.ts
│   ├── user.ts
│   └── app.ts
├── types/                    # 类型定义
│   ├── api.d.ts
│   ├── user.d.ts
│   └── ...
├── utils/                    # 工具函数
│   ├── formatter.ts
│   ├── validator.ts
│   └── ...
├── App.vue
└── main.ts
```

## Conventions

### Vue 3 Composition API
- Use `<script setup lang="ts">` syntax
- Prefer `ref()`, `reactive()`, `computed()` over Options API
- Use `defineProps<T>()` and `defineEmits<T>()` for type-safe props/emits

### TypeScript
- Strict mode enabled
- Avoid `any`, use `unknown` when type is unclear
- Use interface for object types, type for unions/primitives

### Components
- Ant Design Vue components as `a-*` (e.g., `a-button`, `a-table`, `a-modal`)
- Wrap app in `a-config-provider` for theme customization
- Use `a-space` for button groups and spacing

### State (Pinia)
- Stores in `src/stores/`
- Use `storeToRefs()` when destructuring reactive state
- API base URL via `import.meta.env.VITE_API_BASE`

### Router
- Routes defined in `src/router/index.ts`
- Use lazy loading: `component: () => import('@/pages/...')`
- Layout component wraps child routes

### Styling
- Global styles in `src/assets/css/main.css`
- Use Ant Design's built-in utility classes
- Avoid `!important`, use scoped styles when needed

### API
- Use native `fetch` API
- Endpoints: `GET /products`, `POST /cart`, etc.
- Base URL: `import.meta.env.VITE_API_BASE`

## Available Skills

### Development Commands
```bash
pnpm dev          # 开发模式
pnpm build       # 构建生产版本
pnpm preview     # 预览生产版本
pnpm lint        # 代码检查
pnpm typecheck   # 类型检查
```

### Environment Variables
- `VITE_API_BASE` - API基础URL (默认 http://localhost:3000/api)

## Settings

See `settings.json` for:
- Command permissions
- Hook configurations
- Type checking rules
- Ant Design conventions

## Admin Pages

### 商家后台 (Merchant)

| Route | Page | Description |
|-------|------|-------------|
| `/merchant` | 工作台 | 今日数据、待办事项 |
| `/merchant/products` | 商品管理 | 商品列表、上架下架 |
| `/merchant/products/add` | 发布商品 | 新增商品 |
| `/merchant/products/:id/edit` | 编辑商品 | 编辑商品信息 |
| `/merchant/orders` | 订单管理 | 订单列表、发货 |
| `/merchant/refunds` | 售后管理 | 退货退款处理 |
| `/merchant/messages` | 客服消息 | 买家消息 |
| `/merchant/reviews` | 评价管理 | 评价回复 |
| `/merchant/finance` | 财务管理 | 货款结算、提现 |
| `/merchant/settings` | 店铺设置 | 店铺信息 |

### 运营后台 (Admin)

| Route | Page | Description |
|-------|------|-------------|
| `/admin` | 工作台 | 平台概况 |
| `/admin/users` | 用户管理 | 用户列表、详情 |
| `/admin/merchants` | 商家管理 | 商家列表、审核 |
| `/admin/categories` | 类目管理 | 类目配置 |
| `/admin/products/review` | 商品审核 | 待审核商品 |
| `/admin/products/violations` | 违规商品 | 违规处理 |
| `/admin/activities` | 活动管理 | 秒杀、满减等 |
| `/admin/coupons` | 优惠券管理 | 平台优惠券 |
| `/admin/ads` | 广告管理 | Banner广告 |
| `/admin/stats` | 数据报表 | 运营数据 |
| `/admin/settings` | 系统设置 | 热搜词、协议 |

## Best Practices

1. **Ant Design**: Use `a-form` with `a-form-item` for all forms
2. **Tables**: Use `a-table` with pagination, use `rowKey` for proper reactivity
3. **Modals**: Use `a-modal` with `destroyOnClose` to reset state
4. **Messages**: Use `message.success()` / `message.error()` for feedback
5. **Layouts**: Use provided layouts for consistency
6. **Permissions**: Check role before showing restricted features
