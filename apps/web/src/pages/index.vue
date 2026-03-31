<template>
  <div class="home">
    <h1>Marketplace</h1>
    <div class="product-list">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/stores/product'

const productStore = useProductStore()

const products = computed(() => productStore.products)

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<style scoped>
.home {
  padding: 20px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>
