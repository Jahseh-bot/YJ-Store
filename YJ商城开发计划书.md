# YJ商城 开发计划书

**版本号**：V1.0
**创建日期**：2026-03-31
**项目类型**：B2C电商平台（PC Web + B端后台）
**技术栈**：NestJS + TypeScript + PostgreSQL + Redis + React

---

## 一、项目总览

### 1.1 项目组成

| 项目 | 说明 | 端口 |
|------|------|------|
| `@marketplace/api` | C端+B端 API 服务 | 3000 |
| `@marketplace/web` | C端用户商城 (React) | 3001 |
| `@marketplace/admin` | B端后台管理 (React+Ant Design) | 3002 |

### 1.2 开发周期估算

| 阶段 | 内容 | 优先级 |
|------|------|--------|
| 第一阶段 | 项目基础设施搭建 | P0 |
| 第二阶段 | C端用户模块 (注册/登录/用户中心) | P0 |
| 第三阶段 | C端商品模块 (首页/列表/详情) | P0 |
| 第四阶段 | C端购物车与订单模块 | P0 |
| 第五阶段 | C端营销模块 (优惠券/活动) | P1 |
| 第六阶段 | B端商家后台 - 商品与订单 | P0 |
| 第七阶段 | B端商家后台 - 售后与客服 | P1 |
| 第八阶段 | B端运营后台 | P1 |
| 第九阶段 | 平台基础设施 (支付/物流/消息) | P2 |

---

## 二、第一阶段：项目基础设施搭建

**预计完成时间**：1-2天
**目标**：搭建可运行的基础项目骨架

### 任务清单

#### 1.1 初始化项目结构

- [ ] 完善 `apps/api` 目录结构
  - [ ] 创建所有模块目录 (categories, orders, addresses, coupons, activities 等)
  - [ ] 创建 migrations 目录
  - [ ] 创建 seeds 目录及种子数据

- [ ] 初始化 `apps/web` (如果尚未完成)
  - [ ] 创建 React 项目结构
  - [ ] 配置路由
  - [ ] 配置状态管理

- [ ] 初始化 `apps/admin` (如果尚未完成)
  - [ ] 创建 React + Ant Design 项目
  - [ ] 配置路由和布局

#### 1.2 数据库设计

- [ ] 设计并创建数据库迁移文件
  - [ ] 用户表 (users)
  - [ ] 分类表 (categories)
  - [ ] 商品表 (products)
  - [ ] SKU表 (skus)
  - [ ] 商品图片表 (product_images)
  - [ ] 购物车表 (cart_items)
  - [ ] 收货地址表 (addresses)
  - [ ] 订单表 (orders)
  - [ ] 订单商品表 (order_items)
  - [ ] 优惠券表 (coupons)
  - [ ] 用户优惠券表 (user_coupons)
  - [ ] 收藏表 (user_favorites)
  - [ ] 足迹表 (user_footprints)
  - [ ] 商品评价表 (reviews)
  - [ ] 售后表 (refunds)
  - [ ] 店铺表 (shops)
  - [ ] 活动表 (activities)
  - [ ] 广告表 (ads)
  - [ ] 品牌表 (brands)
  - [ ] 运费模板表 (freight_templates)

#### 1.3 基础设施模块

- [ ] 完善 ConfigModule
- [ ] 完善 DatabaseModule
- [ ] 完善 RedisCacheModule
- [ ] 完善 BullQueueModule
- [ ] 配置 Swagger API 文档
- [ ] 配置全局异常过滤器
- [ ] 配置全局拦截器 (日志、响应转换)

#### 1.4 验证标准

- API 启动无报错
- Swagger 文档可访问 (`/api/docs`)
- 数据库连接正常
- Redis 连接正常

---

## 二、第二阶段：C端用户模块

**预计完成时间**：2-3天
**目标**：用户注册、登录、个人中心完整功能

### 2.1 用户认证 (Auth Module)

**API Endpoints:**
```
POST   /api/auth/register     - 用户注册
POST   /api/auth/login        - 用户登录
POST   /api/auth/logout       - 退出登录
POST   /api/auth/refresh      - 刷新Token
GET    /api/auth/profile      - 获取当前用户信息
PUT    /api/auth/profile      - 更新用户信息
PUT    /api/auth/password     - 修改密码
POST   /api/auth/sms/send     - 发送短信验证码
POST   /api/auth/sms/verify   - 验证短信验证码
```

**任务清单:**
- [ ] 创建 AuthModule, AuthController, AuthService
- [ ] 实现 JWT Access Token + Refresh Token 机制
- [ ] 实现登录接口 (手机号+密码)
- [ ] 实现注册接口
- [ ] 实现短信验证码发送 (集成阿里云/腾讯云)
- [ ] 实现 Token 刷新机制
- [ ] 实现第三方登录 (微信扫码登录)
- [ ] 编写单元测试

**前端页面:**
- [ ] 登录页 `/login`
- [ ] 注册页 `/register`
- [ ] 找回密码页 `/forgot-password`

### 2.2 用户中心 (Users Module)

**API Endpoints:**
```
GET    /api/users/profile           - 获取个人资料
PUT    /api/users/profile           - 更新个人资料
PUT    /api/users/avatar            - 上传头像
GET    /api/users/addresses         - 获取收货地址列表
POST   /api/users/addresses         - 新增收货地址
PUT    /api/users/addresses/:id     - 更新收货地址
DELETE /api/users/addresses/:id     - 删除收货地址
PUT    /api/users/addresses/:id/default - 设置默认地址
GET    /api/users/favorites         - 获取收藏列表
POST   /api/users/favorites/:productId - 添加收藏
DELETE /api/users/favorites/:productId - 取消收藏
GET    /api/users/footprints         - 获取足迹列表
DELETE /api/users/footprints/:id     - 删除足迹
DELETE /api/users/footprints/clear   - 清空足迹
```

**任务清单:**
- [ ] 创建 UsersModule, UsersController, UsersService
- [ ] 实现收货地址 CRUD
- [ ] 实现收藏功能
- [ ] 实现足迹功能
- [ ] 实现头像上传 (文件存储)
- [ ] 编写单元测试

**前端页面:**
- [ ] 用户中心首页 `/user`
- [ ] 个人信息页 `/user/profile`
- [ ] 收货地址管理页 `/user/addresses`
- [ ] 我的收藏页 `/user/favorites`
- [ ] 我的足迹页 `/user/footprints`
- [ ] 账户安全页 `/user/security`

---

## 三、第三阶段：C端商品模块

**预计完成时间**：3-4天
**目标**：商品展示、搜索、分类浏览完整功能

### 3.1 商品分类 (Categories Module)

**API Endpoints:**
```
GET    /api/categories              - 获取全部分类树
GET    /api/categories/:id          - 获取分类详情
GET    /api/categories/:id/products - 获取分类下的商品
GET    /api/categories/banners      - 获取分类页Banner
```

**任务清单:**
- [ ] 创建 CategoriesModule, CategoriesController, CategoriesService
- [ ] 实现分类树形结构查询
- [ ] 实现分类缓存 (Redis)
- [ ] 编写单元测试

### 3.2 商品模块 (Products Module)

**API Endpoints:**
```
GET    /api/products                - 商品列表 (分页+筛选+排序)
GET    /api/products/:id            - 商品详情
GET    /api/products/:id/reviews    - 商品评价列表
GET    /api/products/hot            - 热门商品
GET    /api/products/recommend       - 推荐商品
GET    /api/products/new             - 新品上架
GET    /api/search                  - 全局搜索
GET    /api/search/suggest          - 搜索联想词
GET    /api/search/hot              - 热搜词
```

**Query Parameters for GET /api/products:**
```
page, limit                    - 分页
categoryId                     - 分类ID
brandId                        - 品牌ID
minPrice, maxPrice             - 价格区间
color, size, memory           - 属性筛选
sort                           - 排序 (sales, price_asc, price_desc, new, score)
keyword                        - 搜索关键词
```

**任务清单:**
- [ ] 创建 ProductsModule, ProductsController, ProductsService
- [ ] 实现商品 CRUD
- [ ] 实现商品搜索 (Elasticsearch 或 模糊查询)
- [ ] 实现商品筛选 (多属性组合)
- [ ] 实现商品排序
- [ ] 实现商品详情页数据 (含SKU、评价、店铺信息)
- [ ] 实现商品浏览量更新
- [ ] 实现商品缓存策略
- [ ] 编写单元测试

**前端页面:**
- [ ] 首页 `/` (需要商品数据)
- [ ] 商品列表页 `/products`
- [ ] 商品详情页 `/products/:id`

### 3.3 商品评价 (Reviews Module)

**API Endpoints:**
```
GET    /api/reviews                - 评价列表
POST   /api/reviews                - 发表评价
PUT    /api/reviews/:id            - 修改评价
DELETE /api/reviews/:id           - 删除评价
POST   /api/reviews/:id/like       - 点赞评价
POST   /api/reviews/:id/reply      - 商家回复评价
```

**任务清单:**
- [ ] 创建 ReviewsModule, ReviewsController, ReviewsService
- [ ] 实现评价 CRUD
- [ ] 实现评价点赞
- [ ] 实现商家回复
- [ ] 实现评价统计 (好评率等)
- [ ] 编写单元测试

**前端页面:**
- [ ] 评价列表组件 (商品详情页Tab)

---

## 四、第四阶段：C端购物车与订单模块

**预计完成时间**：3-4天
**目标**：购物车和下单流程完整功能

### 4.1 购物车 (Cart Module)

**API Endpoints:**
```
GET    /api/cart                   - 获取购物车列表
POST   /api/cart                   - 添加商品到购物车
PUT    /api/cart/:id               - 更新购物车商品数量
DELETE /api/cart/:id               - 删除购物车商品
PUT    /api/cart/:id/select        - 选择/取消选择商品
PUT    /api/cart/select-all        - 全选/取消全选
GET    /api/cart/count             - 获取购物车商品数量
DELETE /api/cart/clear             - 清空购物车
POST   /api/cart/merge             - 合并游客购物车到用户
```

**任务清单:**
- [ ] 创建 CartModule, CartController, CartService
- [ ] 实现购物车 CRUD
- [ ] 实现购物车商品选择
- [ ] 实现购物车数量更新 (库存校验)
- [ ] 实现购物车商品失效检测 (商品下架/库存不足)
- [ ] 实现游客购物车合并
- [ ] 编写单元测试

**前端页面:**
- [ ] 购物车页 `/cart`

### 4.2 订单 (Orders Module)

**API Endpoints:**
```
POST   /api/orders                 - 创建订单
GET    /api/orders                - 订单列表 (分页+状态筛选)
GET    /api/orders/:id            - 订单详情
PUT    /api/orders/:id/cancel     - 取消订单
POST   /api/orders/:id/pay        - 发起支付
POST   /api/orders/:id/confirm    - 确认收货
POST   /api/orders/:id/review     - 评价订单
DELETE /api/orders/:id            - 删除订单(已完成)
POST   /api/orders/:id/remind      - 提醒发货
```

**任务清单:**
- [ ] 创建 OrdersModule, OrdersController, OrdersService
- [ ] 实现订单创建 (含库存扣减)
- [ ] 实现订单状态流转
- [ ] 实现订单取消 (库存释放)
- [ ] 实现订单号生成 (雪花算法)
- [ ] 编写单元测试

**前端页面:**
- [ ] 确认订单页 `/checkout`
- [ ] 订单列表页 `/orders`
- [ ] 订单详情页 `/orders/:id`

### 4.3 支付 (Payments Module)

**API Endpoints:**
```
POST   /api/payments/create        - 创建支付订单
GET    /api/payments/:id           - 获取支付信息
POST   /api/payments/callback      - 支付回调
POST   /api/payments/query         - 支付状态查询
```

**任务清单:**
- [ ] 创建 PaymentsModule, PaymentsController, PaymentsService
- [ ] 实现微信支付对接
- [ ] 实现支付宝对接
- [ ] 实现支付回调处理
- [ ] 实现支付状态查询
- [ ] 编写单元测试

**前端页面:**
- [ ] 支付页 `/pay/:orderId`

### 4.4 物流 (Logistics Module)

**API Endpoints:**
```
GET    /api/logistics/:orderId     - 获取物流信息
GET    /api/logistics/company/list - 获取物流公司列表
```

**任务清单:**
- [ ] 创建 LogisticsModule, LogisticsController, LogisticsService
- [ ] 实现物流查询 (集成快递鸟/菜鸟)
- [ ] 实现物流轨迹展示

**前端页面:**
- [ ] 物流详情页 `/logistics/:orderId`

---

## 五、第五阶段：C端营销模块

**预计完成时间**：2-3天
**目标**：优惠券、活动参与功能

### 5.1 优惠券 (Coupons Module)

**API Endpoints:**
```
GET    /api/coupons/available      - 获取可用优惠券列表
GET    /api/coupons/mine           - 我的优惠券
POST   /api/coupons/:id/claim      - 领取优惠券
POST   /api/coupons/:id/use        - 使用优惠券(下单时)
GET    /api/coupons/:id/check      - 检查优惠券可用性
```

**任务清单:**
- [ ] 创建 CouponsModule, CouponsController, CouponsService
- [ ] 实现优惠券领取
- [ ] 实现优惠券使用校验
- [ ] 实现优惠券过期处理 (定时任务)
- [ ] 编写单元测试

**前端页面:**
- [ ] 优惠券领取页 `/coupons`
- [ ] 我的优惠券页 `/user/coupons`

### 5.2 活动 (Activities Module)

**API Endpoints:**
```
GET    /api/activities              - 活动列表
GET    /api/activities/:id         - 活动详情
GET    /api/activities/:id/products - 活动商品列表
POST   /api/activities/:id/join    - 参与活动(秒杀等)
```

**任务清单:**
- [ ] 创建 ActivitiesModule, ActivitiesController, ActivitiesService
- [ ] 实现秒杀活动功能
- [ ] 实现满减活动
- [ ] 实现活动商品展示
- [ ] 编写单元测试

**前端页面:**
- [ ] 活动详情页 `/activity/:id`
- [ ] 秒杀频道页 `/seckill`

---

## 六、第六阶段：B端商家后台 - 商品与订单

**预计完成时间**：3-4天
**目标**：商家发布的商品管理和订单处理

### 6.1 商家模块 (Shops Module)

**API Endpoints:**
```
GET    /api/shops/mine             - 获取我的店铺信息
PUT    /api/shops/mine             - 更新店铺信息
GET    /api/shops/:id              - 获取店铺详情
GET    /api/shops/:id/products     - 获取店铺商品列表
GET    /api/shops/:id/reviews      - 获取店铺评价
GET    /api/shops/:id/stats        - 获取店铺统计
```

### 6.2 商家商品管理

**API Endpoints:**
```
GET    /api/merchant/products      - 商品列表
POST   /api/merchant/products      - 发布商品
GET    /api/merchant/products/:id - 商品详情
PUT    /api/merchant/products/:id - 编辑商品
DELETE /api/merchant/products/:id - 删除商品
PUT    /api/merchant/products/:id/online   - 上架
PUT    /api/merchant/products/:id/offline  - 下架
GET    /api/merchant/products/:id/skus    - SKU列表
PUT    /api/merchant/products/:id/skus     - 更新SKU
PUT    /api/merchant/products/:id/stock    - 库存管理
GET    /api/merchant/specs         - 规格模板列表
POST   /api/merchant/specs         - 创建规格模板
PUT    /api/merchant/specs/:id     - 编辑规格模板
DELETE /api/merchant/specs/:id     - 删除规格模板
```

**商家端前端页面:**
- [ ] 商家工作台 `/merchant`
- [ ] 商品列表 `/merchant/products`
- [ ] 发布商品页 `/merchant/products/add`
- [ ] 编辑商品页 `/merchant/products/:id/edit`
- [ ] SKU管理 `/merchant/products/:id/skus`
- [ ] 规格模板 `/merchant/specs`

### 6.3 商家订单管理

**API Endpoints:**
```
GET    /api/merchant/orders        - 订单列表
GET    /api/merchant/orders/:id    - 订单详情
POST   /api/merchant/orders/:id/ship    - 发货
POST   /api/merchant/orders/batch-ship  - 批量发货
PUT    /api/merchant/orders/:id/remark  - 添加备注
GET    /api/merchant/orders/export      - 导出订单
```

**商家端前端页面:**
- [ ] 订单列表 `/merchant/orders`
- [ ] 订单详情 `/merchant/orders/:id`
- [ ]批量发货 `/merchant/orders/batch-ship`

---

## 七、第七阶段：B端商家后台 - 售后与客服

**预计完成时间**：2-3天
**目标**：售后处理和客服功能

### 7.1 商家售后管理

**API Endpoints:**
```
GET    /api/merchant/refunds              - 售后列表
GET    /api/merchant/refunds/:id          - 售后详情
POST   /api/merchant/refunds/:id/agree    - 同意售后
POST   /api/merchant/refunds/:id/reject   - 拒绝售后
POST   /api/merchant/refunds/:id/receive  - 确认收货
POST   /api/merchant/refunds/:id/refund   - 确认退款
```

**商家端前端页面:**
- [ ] 售后列表 `/merchant/refunds`
- [ ] 售后详情 `/merchant/refunds/:id`

### 7.2 商家客服

**API Endpoints:**
```
GET    /api/merchant/messages              - 消息列表
GET    /api/merchant/messages/:sessionId  - 会话详情
POST   /api/merchant/messages/:sessionId  - 发送消息
PUT    /api/merchant/messages/read        - 标记已读
GET    /api/merchant/reviews              - 评价管理
POST   /api/merchant/reviews/:id/reply    - 回复评价
```

**商家端前端页面:**
- [ ] 客服消息页 `/merchant/messages`
- [ ] 评价管理 `/merchant/reviews`

### 7.3 商家财务

**API Endpoints:**
```
GET    /api/merchant/finance/summary      - 财务概览
GET    /api/merchant/finance/orders      - 订单收入明细
GET    /api/merchant/finance/refunds      - 退款明细
GET    /api/merchant/finance/withdraw    - 提现记录
POST   /api/merchant/finance/withdraw    - 申请提现
GET    /api/merchant/finance/bill        - 对账单
```

**商家端前端页面:**
- [ ] 财务概览 `/merchant/finance`
- [ ] 货款结算 `/merchant/finance/settlements`
- [ ] 提现申请 `/merchant/finance/withdraw`

---

## 八、第八阶段：B端运营后台

**预计完成时间**：3-4天
**目标**：平台运营管理功能

### 8.1 运营用户管理

**API Endpoints:**
```
GET    /api/admin/users                  - 用户列表
GET    /api/admin/users/:id             - 用户详情
PUT    /api/admin/users/:id/status      - 启用/禁用用户
PUT    /api/admin/users/:id/points      - 调整积分
PUT    /api/admin/users/:id/balance     - 调整余额
```

### 8.2 运营商家管理

**API Endpoints:**
```
GET    /api/admin/merchants             - 商家列表
GET    /api/admin/merchants/:id        - 商家详情
POST   /api/admin/merchants/:id/verify - 审核商家
PUT    /api/admin/merchants/:id/status - 商家状态管理
GET    /api/admin/merchants/stats      - 商家统计
```

### 8.3 运营类目管理

**API Endpoints:**
```
GET    /api/admin/categories            - 类目列表
POST   /api/admin/categories            - 新增类目
PUT    /api/admin/categories/:id        - 编辑类目
DELETE /api/admin/categories/:id       - 删除类目
PUT    /api/admin/categories/:id/sort   - 排序
GET    /api/admin/categories/:id/attrs  - 类目属性
POST   /api/admin/categories/:id/attrs  - 添加属性
```

### 8.4 运营商品审核

**API Endpoints:**
```
GET    /api/admin/products/pending      - 待审核商品
GET    /api/admin/products/:id         - 审核详情
POST   /api/admin/products/:id/approve  - 审核通过
POST   /api/admin/products/:id/reject   - 审核拒绝
GET    /api/admin/products/violations  - 违规商品
PUT    /api/admin/products/:id/punish  - 处罚商品
```

### 8.5 运营活动管理

**API Endpoints:**
```
GET    /api/admin/activities            - 活动列表
POST   /api/admin/activities            - 创建活动
PUT    /api/admin/activities/:id       - 编辑活动
DELETE /api/admin/activities/:id       - 删除活动
GET    /api/admin/activities/:id/joinings - 参与商家
PUT    /api/admin/activities/:id/audit  - 审核商家参加
```

### 8.6 运营优惠券管理

**API Endpoints:**
```
GET    /api/admin/coupons               - 优惠券列表
POST   /api/admin/coupons               - 创建优惠券
PUT    /api/admin/coupons/:id           - 编辑优惠券
DELETE /api/admin/coupons/:id           - 删除优惠券
POST   /api/admin/coupons/:id/issue     - 发放优惠券
GET    /api/admin/coupons/:id/stats     - 优惠券统计
```

### 8.7 运营广告管理

**API Endpoints:**
```
GET    /api/admin/ad-positions          - 广告位列表
POST   /api/admin/ad-positions          - 创建广告位
PUT    /api/admin/ad-positions/:id      - 编辑广告位
GET    /api/admin/ads                   - 广告列表
POST   /api/admin/ads                   - 创建广告
PUT    /api/admin/ads/:id               - 编辑广告
DELETE /api/admin/ads/:id               - 删除广告
PUT    /api/admin/ads/:id/status        - 启用/禁用
```

### 8.8 运营数据报表

**API Endpoints:**
```
GET    /api/admin/stats/overview         - 运营概览
GET    /api/admin/stats/sales           - 销售数据
GET    /api/admin/stats/users           - 用户数据
GET    /api/admin/stats/products       - 商品数据
GET    /api/admin/stats/merchants      - 商家数据
```

### 8.9 运营系统设置

**API Endpoints:**
```
GET    /api/admin/settings              - 获取设置
PUT    /api/admin/settings              - 更新设置
GET    /api/admin/settings/hot-search   - 热搜词管理
PUT    /api/admin/settings/hot-search   - 更新热搜词
GET    /api/admin/settings/agreement    - 协议管理
```

**运营后台前端页面:**
- [ ] 工作台 `/admin`
- [ ] 用户管理 `/admin/users`
- [ ] 商家管理 `/admin/merchants`
- [ ] 类目管理 `/admin/categories`
- [ ] 商品审核 `/admin/products/review`
- [ ] 活动管理 `/admin/activities`
- [ ] 优惠券管理 `/admin/coupons`
- [ ] 广告管理 `/admin/ads`
- [ ] 数据报表 `/admin/stats`
- [ ] 系统设置 `/admin/settings`

---

## 九、第九阶段：平台基础设施

**预计完成时间**：2-3天
**目标**：支付、物流、消息通知等基础设施

### 9.1 消息通知

- [ ] 短信通知服务
- [ ] 邮件通知服务
- [ ] WebSocket 实时消息
- [ ] 系统通知

### 9.2 文件存储

- [ ] 图片上传服务 (OSS/S3)
- [ ] 文件管理服务

### 9.3 定时任务

- [ ] 订单超时取消 (定时检查)
- [ ] 优惠券过期处理
- [ ] 库存预警
- [ ] 统计数据汇总

### 9.4 监控日志

- [ ] 请求日志
- [ ] 错误日志
- [ ] 业务日志

---

## 十、开发优先级与里程碑

### 里程碑一：MVP版本 (第1-2周)

| 阶段 | 内容 | 完成标准 |
|------|------|----------|
| 第一阶段 | 基础设施 | API可运行，文档可访问 |
| 第二阶段 | 用户模块 | 注册/登录/用户中心可用 |
| 第三阶段 | 商品模块 | 首页/列表/详情可用 |

### 里程碑二：核心交易 (第3-4周)

| 阶段 | 内容 | 完成标准 |
|------|------|----------|
| 第四阶段 | 购物车+订单 | 完整下单流程 |
| 第五阶段 | 营销模块 | 优惠券/活动可参与 |

### 里程碑三：商家后台 (第5-6周)

| 阶段 | 内容 | 完成标准 |
|------|------|----------|
| 第六阶段 | 商家商品+订单 | 商品发布/订单处理 |
| 第七阶段 | 售后+客服 | 售后处理/客服消息 |

### 里程碑四：运营后台 (第7-8周)

| 阶段 | 内容 | 完成标准 |
|------|------|----------|
| 第八阶段 | 运营功能 | 用户/商家/商品管理 |
| 第九阶段 | 基础设施 | 支付/通知/定时任务 |

---

## 十一、技术债务与优化

### 后期优化项

- [ ] Elasticsearch 全文搜索
- [ ] Redis 分布式锁
- [ ] 消息队列优化
- [ ] 数据库读写分离
- [ ] CDN 静态资源加速
- [ ] 接口性能优化
- [ ] 前端性能优化 (SSR/SSG)

---

## 十二、修订记录

| 版本 | 日期 | 修改内容 | 修改人 |
|------|------|----------|--------|
| V1.0 | 2026-03-31 | 初始版本 | 产品经理 |
