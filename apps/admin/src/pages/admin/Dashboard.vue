<template>
  <div>
    <h1>Dashboard</h1>
    <a-row :gutter="16" style="margin-top: 24px">
      <a-col :span="8">
        <a-card>
          <a-statistic title="Products" :value="stats.products" />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <a-statistic title="Orders" :value="stats.orders" />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <a-statistic title="Revenue" :value="stats.revenue" prefix="¥" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const stats = reactive({
  products: 12,
  orders: 48,
  revenue: 12580
})
</script>
