<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <span v-if="!collapsed">Admin</span>
        <span v-else>A</span>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="/admin">
          <router-link to="/admin">
            <DashboardOutlined />
            <span>Dashboard</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/admin/products">
          <router-link to="/admin/products">
            <ShoppingOutlined />
            <span>Products</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/admin/orders">
          <router-link to="/admin/orders">
            <FileTextOutlined />
            <span>Orders</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 24px; display: flex; align-items: center;">
        <MenuFoldOutlined style="font-size: 18px; cursor: pointer" @click="collapsed = !collapsed" />
        <div style="margin-left: auto">
          <a href="http://localhost:3001" target="_blank">← Back to Store</a>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 24px 16px; padding: 24px; background: #fff">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  DashboardOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue'

const collapsed = ref(false)
const selectedKeys = ref(['/admin'])
const route = useRoute()

watch(
  () => route.path,
  (path) => {
    selectedKeys.value = [path]
  },
  { immediate: true }
)
</script>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
}

:deep(.ant-menu-item) {
  margin: 0;
}

:deep(.ant-menu-item a) {
  color: inherit;
}
</style>
