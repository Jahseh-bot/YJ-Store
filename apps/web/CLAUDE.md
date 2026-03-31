# Marketplace Frontend (Web)

## Tech Stack
- **Framework**: Nuxt 3 (Vue 3)
- **State Management**: Pinia (`@pinia/nuxt`)
- **Styling**: Scoped CSS + global CSS

## Conventions

### Nuxt Auto-imports
- Composables in `src/composables/` are auto-imported
- Stores in `src/stores/` are auto-imported via `@pinia/nuxt`
- `definePageMeta`, `useRuntimeConfig`, `useFetch` are Nuxt auto-imports

### Pages & Routing
- Pages use `src/pages/` directory-based routing
- Admin routes were moved to `apps/admin`
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
- Endpoints: `GET /products`, `POST /cart`, etc.

### TypeScript
- Strict mode enabled
- Use `ref<T>`, `reactive<T>` for type-safe reactivity
- Avoid `any`, use `unknown` when type is unclear
