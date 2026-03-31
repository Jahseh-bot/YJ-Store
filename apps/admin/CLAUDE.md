# Marketplace Admin Panel

## Tech Stack
- **Framework**: Vue 3 (Composition API + `<script setup>`)
- **Build Tool**: Vite
- **UI Library**: Ant Design Vue 4
- **State Management**: Pinia
- **Router**: Vue Router 4

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
