<template>
  <div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 16px">
      <h1 style="margin: 0">Products</h1>
      <a-button type="primary" @click="showModal = true">Add Product</a-button>
    </div>

    <a-table :columns="columns" :data-source="products" row-key="id" :loading="loading">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'image'">
          <img :src="record.image" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px" />
        </template>
        <template v-if="column.key === 'actions'">
          <a-space>
            <a-button size="small" @click="editProduct(record)">Edit</a-button>
            <a-button size="small" danger @click="deleteProduct(record.id)">Delete</a-button>
          </a-space>
        </template>
      </template>
    </a-table>

    <a-modal v-model:open="showModal" :title="editingProduct ? 'Edit Product' : 'Add Product'" @ok="handleOk">
      <a-form :model="form" layout="vertical">
        <a-form-item label="Name" name="name">
          <a-input v-model:value="form.name" />
        </a-form-item>
        <a-form-item label="Description" name="description">
          <a-textarea v-model:value="form.description" />
        </a-form-item>
        <a-form-item label="Price" name="price">
          <a-input-number v-model:value="form.price" :min="0" :precision="2" style="width: 100%" />
        </a-form-item>
        <a-form-item label="Image URL" name="image">
          <a-input v-model:value="form.image" />
        </a-form-item>
        <a-form-item label="Stock" name="stock">
          <a-input-number v-model:value="form.stock" :min="0" style="width: 100%" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { useProductStore } from '@/stores/product'
import type { Product } from '@/types/product'

const productStore = useProductStore()
const products = computed(() => productStore.products)
const loading = computed(() => productStore.loading)

const showModal = ref(false)
const editingProduct = ref<Product | null>(null)

const form = reactive({
  name: '',
  description: '',
  price: 0,
  image: '',
  stock: 0
})

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: 'Image', key: 'image', width: 100 },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Price', dataIndex: 'price', key: 'price' },
  { title: 'Stock', dataIndex: 'stock', key: 'stock' },
  { title: 'Actions', key: 'actions', width: 150 }
]

const editProduct = (product: Product) => {
  editingProduct.value = product
  Object.assign(form, product)
  showModal.value = true
}

const deleteProduct = (id: number) => {
  message.info(`Delete product ${id}`)
}

const handleOk = () => {
  message.success(editingProduct.value ? 'Product updated' : 'Product added')
  showModal.value = false
  editingProduct.value = null
  Object.assign(form, { name: '', description: '', price: 0, image: '', stock: 0 })
}

onMounted(() => {
  productStore.fetchProducts()
})
</script>
