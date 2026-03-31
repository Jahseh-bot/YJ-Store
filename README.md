# Marketplace

A full-stack marketplace application using Turborepo, Nuxt 3, and NestJS.

## Tech Stack

- **Monorepo**: Turborepo
- **Frontend**: Nuxt 3, TypeScript, Pinia
- **Backend**: NestJS, TypeScript

## Project Structure

```
marketplace/
├── apps/
│   ├── web/          # Nuxt 3 Frontend
│   │   ├── pages/
│   │   │   ├── index.vue      # Store home
│   │   │   ├── cart.vue       # Shopping cart
│   │   │   └── admin/         # Admin panel
│   │   │       ├── index.vue  # Dashboard
│   │   │       ├── products/ # Product management
│   │   │       └── orders.vue # Order management
│   │   └── stores/            # Pinia stores
│   └── api/          # NestJS Backend
│       └── src/modules/
│           ├── products/
│           ├── auth/
│           ├── cart/
│           └── users/
├── turbo.json
└── package.json
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Start all apps in development mode:

```bash
npm run dev
```

### Individual Apps

**Frontend (Nuxt 3)**:
```bash
cd apps/web
npm run dev # http://localhost:3001
```

**Backend (NestJS)**:
```bash
cd apps/api
npm run dev # http://localhost:3000/api
```

## Pages

### Store Front
- `/` - Home page with product listing
- `/cart` - Shopping cart

### Admin Panel
- `/admin` - Dashboard with stats
- `/admin/products` - Product management (CRUD)
- `/admin/orders` - Order management

## API Documentation

When the backend is running, visit:
- Swagger UI: http://localhost:3000/api/docs

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | List all products |
| POST | /api/products | Create product |
| GET | /api/products/:id | Get product |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |
| POST | /api/auth/login | User login |
| GET | /api/cart | Get cart items |
| POST | /api/cart | Add to cart |
| DELETE | /api/cart/:id | Remove from cart |
| GET | /api/users/:id | Get user |

## Environment Variables

Copy `.env.example` to `.env` in each app directory.
