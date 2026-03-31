# YJ商城 - Monorepo Root

## Project Structure

```
marketplace/
├── apps/
│   ├── api/         # NestJS API服务 (端口 3000)
│   ├── web/        # Nuxt 3 C端商城 (端口 3001)
│   └── admin/      # Vue 3 + AntD 后台 (端口 3002)
├── .claude/        # Claude Code配置
├── docs/           # 项目文档
│   ├── YJ商城PRD.md
│   ├── YJ商城后台管理系统PRD.md
│   ├── YJ商城B端C端功能对照表.md
│   └── YJ商城开发计划书.md
└── package.json    # Turborepo根配置
```

## Apps

### @marketplace/api
NestJS REST API，服务端核心
- 端口: 3000
- 文档: `/api/docs`
- 命令: `pnpm --filter @marketplace/api dev`

### @marketplace/web
Nuxt 3 商城前端，用户购物入口
- 端口: 3001
- 命令: `pnpm --filter @marketplace/web dev`

### @marketplace/admin
Vue 3 + Ant Design 后台管理
- 端口: 3002
- 命令: `pnpm --filter @marketplace/admin dev`

## Root Commands

```bash
pnpm install          # 安装所有项目依赖
pnpm build            # 构建所有项目
pnpm dev              # 启动所有项目开发服务器
pnpm lint             # 检查所有项目
pnpm clean            # 清理所有dist和cache
```

## Development Workflow

### Monorepo Management
```bash
# 使用turbo过滤只构建特定项目
pnpm --filter @marketplace/api build
pnpm --filter @marketplace/web build
pnpm --filter @marketplace/admin build

# 添加依赖到特定项目
pnpm --filter @marketplace/api add @nestjs/jwt
```

### API Development
```bash
cd apps/api
pnpm dev              # 启动开发服务器
pnpm db:migrate      # 运行迁移
pnpm db:seed         # 种子数据
```

### Web Development
```bash
cd apps/web
pnpm dev              # 启动Nuxt开发服务器
```

### Admin Development
```bash
cd apps/admin
pnpm dev              # 启动Vite开发服务器
```

## Documents

| Document | Description |
|----------|-------------|
| `YJ商城PRD.md` | C端用户商城产品需求文档 |
| `YJ商城后台管理系统PRD.md` | B端后台产品需求文档 |
| `YJ商城B端C端功能对照表.md` | B端C端功能对应关系 |
| `YJ商城开发计划书.md` | 开发阶段计划和里程碑 |

## Skills & Tools

### Claude Code Skills
Available at root and in each app:
- `settings.json` - 命令权限和hooks配置
- `CLAUDE.md` - 项目约定和说明

### Project-specific Skills
Each app has its own `settings.json` with:
- Command permissions
- Before/After hooks
- Code review rules
- TypeScript conventions

### MCP Servers
Configured in `.claude/settings.local.json`:
- `chrome-mcp-server` - Chrome调试
- `filesystem` - 文件系统访问
- `fetch` - HTTP请求

## Best Practices

1. **Monorepo**: Use `pnpm --filter` to target specific apps
2. **Dependencies**: Shared deps go to root, app-specific to app
3. **Build Order**: API builds first, then web and admin
4. **Environment**: Each app has `.env` for local overrides
5. **Documentation**: Keep PRDs updated when features change

## Git Workflow

```bash
# 提交所有项目的更改
git add .
git commit -m "feat(api): add user authentication"

# 或只提交特定项目
git add apps/api/src/modules/auth
git commit -m "feat(api): implement JWT auth"
```

## 参考文档

- [NestJS文档](https://docs.nestjs.com)
- [Nuxt 3文档](https://nuxt.com)
- [Vue 3文档](https://vuejs.org)
- [Ant Design Vue](https://antdv.com)
- [TypeORM文档](https://typeorm.io)
- [Turborepo文档](https://turbo.build/repo)
