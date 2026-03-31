<template>
  <div>
    <h1>Orders</h1>
    <a-table :columns="columns" :data-source="orders" row-key="id" style="margin-top: 24px">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <a-tag :color="getStatusColor(record.status)">{{ record.status }}</a-tag>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Order {
  id: number
  customer: string
  items: number
  total: number
  status: string
  date: string
}

const columns = [
  { title: 'Order ID', dataIndex: 'id', key: 'id' },
  { title: 'Customer', dataIndex: 'customer', key: 'customer' },
  { title: 'Items', dataIndex: 'items', key: 'items' },
  { title: 'Total', dataIndex: 'total', key: 'total' },
  { title: 'Status', key: 'status' },
  { title: 'Date', dataIndex: 'date', key: 'date' }
]

const orders = ref<Order[]>([
  { id: 1001, customer: 'John Doe', items: 3, total: 299.97, status: 'Pending', date: '2024-03-30' },
  { id: 1002, customer: 'Jane Smith', items: 1, total: 99.99, status: 'Completed', date: '2024-03-29' },
  { id: 1003, customer: 'Bob Wilson', items: 5, total: 450.00, status: 'Processing', date: '2024-03-28' }
])

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    Pending: 'orange',
    Completed: 'green',
    Processing: 'blue'
  }
  return colors[status] || 'default'
}
</script>
