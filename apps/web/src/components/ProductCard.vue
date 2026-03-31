<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.name" class="product-image" />
    <h3>{{ product.name }}</h3>
    <p class="price">¥{{ product.price }}</p>
    <button @click="addToCart">Add to Cart</button>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'
import { useCartStore } from '~/stores/cart'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const cartStore = useCartStore()

const addToCart = () => {
  cartStore.addItem(props.product)
}
</script>

<style scoped>
.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.price {
  color: #f60;
  font-size: 18px;
  font-weight: bold;
}

button {
  background: #f60;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #e55;
}
</style>
