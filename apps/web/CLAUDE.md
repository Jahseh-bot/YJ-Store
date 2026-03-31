# Marketplace Frontend (Web)

## Tech Stack
- **Framework**: Nuxt 3 (Vue 3)
- **State Management**: Pinia (`@pinia/nuxt`)
- **Styling**: Scoped CSS + global CSS
- **Type Safety**: TypeScript strict mode

## Project Structure

```
src/
├── pages/                    # 页面 (基于文件路由)
│   ├── index.vue            # 首页
│   ├── products/            # 商品相关
│   │   ├── index.vue       # 商品列表
│   │   └── [id].vue        # 商品详情
│   ├── cart.vue            # 购物车
│   ├── checkout.vue         # 结算
│   ├── orders/              # 订单
│   │   ├── index.vue       # 订单列表
│   │   └── [id].vue        # 订单详情
│   └── user/                # 用户中心
│       ├── index.vue
│       ├── profile.vue
│       ├── addresses.vue
│       ├── favorites.vue
│       └── footprints.vue
├── components/               # 组件
│   ├── product/             # 商品组件
│   ├── cart/                # 购物车组件
│   ├── order/               # 订单组件
│   └── user/                # 用户组件
├── composables/              # 组合式函数
│   ├── useAuth.ts
│   ├── useCart.ts
│   ├── useProducts.ts
│   └── useApi.ts
├── stores/                   # Pinia状态库
│   ├── auth.ts
│   ├── cart.ts
│   ├── user.ts
│   └── app.ts
├── types/                    # 类型定义
├── assets/                   # 静态资源
│   └── css/
├── layouts/                  # 布局
│   ├── default.vue
│   └── auth.vue
└── middleware/               # 中间件
```

## Conventions

### Nuxt Auto-imports
- Composables in `src/composables/` are auto-imported
- Stores in `src/stores/` are auto-imported via `@pinia/nuxt`
- `definePageMeta`, `useRuntimeConfig`, `useFetch` are Nuxt auto-imports

### Pages & Routing
- Pages use `src/pages/` directory-based routing
- Use `definePageMeta({ layout: 'xxx' })` for layout selection

### Components
- Components in `src/components/` are auto-imported
- Use PascalCase for component names in templates
- Scoped styles preferred, global styles in `src/assets/css/`

### State (Pinia)
- Stores auto-imported from `src/stores/`
- Use `storeToRefs()` when destructuring reactive state from store

### API
- API base URL via `useRuntimeConfig().public.apiBase`
- Use `$fetch` for API calls in stores and composables

### TypeScript
- Strict mode enabled
- Use `ref<T>`, `reactive<T>` for type-safe reactivity
- Avoid `any`, use `unknown` when type is unclear

## Available Skills

### Development Commands
```bash
pnpm dev          # 开发模式
pnpm build       # 构建生产版本
pnpm generate    # 生成静态站点
pnpm preview     # 预览生产版本
pnpm lint        # 代码检查
pnpm typecheck   # 类型检查
```

### Environment Variables
- `NUXT_PUBLIC_API_BASE` - API基础URL (默认 http://localhost:3000/api)

## Settings

See `settings.json` for:
- Command permissions
- Hook configurations
- Type checking rules
- Vue conventions

## Best Practices

1. **Composables**: Put reusable logic in composables, not stores
2. **API Calls**: Use `$fetch` in composables, not in components
3. **SSR**: Be careful with `window`/`document` in SSR context
4. **State**: Use stores for cross-component state, composables for local state
5. **Types**: Define interfaces for API responses in `types/`

## Pages List

| Route | Page | Description |
|-------|------|-------------|
| `/` | 首页 | Banner、商品推荐、分类入口 |
| `/products` | 商品列表 | 筛选、排序、分页 |
| `/products/:id` | 商品详情 | 图片、SKU、评价、详情 |
| `/cart` | 购物车 | 商品列表、结算入口 |
| `/checkout` | 确认订单 | 地址、支付方式、优惠券 |
| `/orders` | 订单列表 | 各状态订单 |
| `/orders/:id` | 订单详情 | 物流、评价入口 |
| `/login` | 登录 | 登录/注册表单 |
| `/user` | 用户中心 | 个人信息入口 |
| `/user/profile` | 个人信息 | 修改资料 |
| `/user/addresses` | 收货地址 | 地址管理 |
| `/user/favorites` | 我的收藏 | 收藏商品 |
| `/user/footprints` | 我的足迹 | 浏览历史 |
