<template>
  <div class="layout">
    <header class="header">
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/cart">Cart ({{ cartStore.totalItems }})</NuxtLink>
        <NuxtLink to="http://localhost:3002" target="_blank">Admin</NuxtLink>
      </nav>
    </header>
    <main class="main">
      <slot />
    </main>
    <footer class="footer">
      <p>&copy; 2024 Marketplace</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #333;
  color: white;
  padding: 16px 20px;
}

.header nav {
  display: flex;
  gap: 20px;
}

.header a {
  color: white;
  text-decoration: none;
}

.header a:hover {
  text-decoration: underline;
}

.main {
  flex: 1;
  padding: 20px;
}

.footer {
  background: #f5f5f5;
  padding: 20px;
  text-align: center;
}
</style>
