# Progress Skill

## Purpose
Track development progress of YJ商城 project by marking completed tasks in the development plan.

## Usage
```
/progress show
/progress mark <task-id>
```

## Commands

### `/progress show`
Displays current development progress with all tasks and their completion status.

### `/progress mark <section.task>`
Mark a specific task as completed. Use dot notation:
- Phase 1 tasks: `1.1`, `1.2`, `1.3`, `1.4`
- Phase 2 tasks: `2.1`, `2.2`
- Phase 3 tasks: `3.1`, `3.2`, `3.3`
- Phase 4 tasks: `4.1`, `4.2`, `4.3`, `4.4`
- etc.

Examples:
- `/progress mark 1.1` - Mark "第一阶段 - 1.1 初始化项目结构" as done
- `/progress mark 2.1` - Mark "第二阶段 - 2.1 用户认证" as done
- `/progress mark 3.2` - Mark "第三阶段 - 3.2 商品模块" as done

## Task Reference

### Phase 1: 项目基础设施搭建 (1-2天)
- [ ] 1.1 初始化项目结构
- [ ] 1.2 数据库设计
- [ ] 1.3 基础设施模块
- [ ] 1.4 验证标准

### Phase 2: C端用户模块 (2-3天)
- [ ] 2.1 用户认证 (Auth Module)
- [ ] 2.2 用户中心 (Users Module)

### Phase 3: C端商品模块 (3-4天)
- [ ] 3.1 商品分类 (Categories Module)
- [ ] 3.2 商品模块 (Products Module)
- [ ] 3.3 商品评价 (Reviews Module)

### Phase 4: C端购物车与订单模块 (3-4天)
- [ ] 4.1 购物车 (Cart Module)
- [ ] 4.2 订单 (Orders Module)
- [ ] 4.3 支付 (Payments Module)
- [ ] 4.4 物流 (Logistics Module)

### Phase 5: C端营销模块 (2-3天)
- [ ] 5.1 优惠券 (Coupons Module)
- [ ] 5.2 活动 (Activities Module)

### Phase 6: B端商家后台 - 商品与订单 (3-4天)
- [ ] 6.1 商家模块 (Shops Module)
- [ ] 6.2 商家商品管理
- [ ] 6.3 商家订单管理

### Phase 7: B端商家后台 - 售后与客服 (2-3天)
- [ ] 7.1 商家售后管理
- [ ] 7.2 商家客服
- [ ] 7.3 商家财务

### Phase 8: B端运营后台 (3-4天)
- [ ] 8.1 运营用户管理
- [ ] 8.2 运营商家管理
- [ ] 8.3 运营类目管理
- [ ] 8.4 运营商品审核
- [ ] 8.5 运营活动管理
- [ ] 8.6 运营优惠券管理
- [ ] 8.7 运营广告管理
- [ ] 8.8 运营数据报表
- [ ] 8.9 运营系统设置

### Phase 9: 平台基础设施 (2-3天)
- [ ] 9.1 消息通知
- [ ] 9.2 文件存储
- [ ] 9.3 定时任务
- [ ] 9.4 监控日志

## Implementation

Progress data stored in `skills/progress.json`

Run commands:
```bash
node .claude/skills/progress-tracker.js show   # View progress
node .claude/skills/progress-tracker.js mark 1.1  # Mark task complete
node .claude/skills/progress-tracker.js list   # List all tasks
```

## Notes
- Completed tasks are marked with `[x]`
- Pending tasks are marked with `[ ]`
- Progress is automatically saved after each update
- Milestones auto-complete when all related tasks are done
