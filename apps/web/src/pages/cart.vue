<template>
  <div class="cart">
    <h1>Shopping Cart</h1>
    <div v-if="cartStore.items.length === 0" class="empty">
      Your cart is empty
    </div>
    <div v-else class="cart-items">
      <div v-for="item in cartStore.items" :key="item.product.id" class="cart-item">
        <img :src="item.product.image" :alt="item.product.name" />
        <div class="info">
          <h3>{{ item.product.name }}</h3>
          <p>¥{{ item.product.price }}</p>
        </div>
        <div class="quantity">
          <button @click="decrease(item)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="increase(item)">+</button>
        </div>
        <p class="subtotal">¥{{ item.product.price * item.quantity }}</p>
        <button @click="remove(item.product.id)" class="remove">Remove</button>
      </div>
      <div class="total">
        Total: ¥{{ cartStore.totalPrice }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import type { CartItem } from '~/types/cart'

const cartStore = useCartStore()

const increase = (item: CartItem) => {
  cartStore.updateQuantity(item.product.id, item.quantity + 1)
}

const decrease = (item: CartItem) => {
  cartStore.updateQuantity(item.product.id, item.quantity - 1)
}

const remove = (productId: number) => {
  cartStore.removeItem(productId)
}
</script>

<style scoped>
.cart {
  padding: 20px;
}

.cart-items {
  margin-top: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.info {
  flex: 1;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity button {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
}

.remove {
  color: #f60;
  background: none;
  border: none;
  padding: 8px;
}

.total {
  text-align: right;
  font-size: 24px;
  font-weight: bold;
  padding: 20px 0;
}
</style>
