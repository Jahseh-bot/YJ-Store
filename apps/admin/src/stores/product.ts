import { defineStore } from 'pinia'
import type { Product } from '@/types/product'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api'

interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        const res = await fetch(`${API_BASE}/products`)
        this.products = await res.json()
      } catch (e) {
        this.error = 'Failed to fetch products'
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    async getProductById(id: number): Promise<Product | null> {
      try {
        const res = await fetch(`${API_BASE}/products/${id}`)
        return await res.json()
      } catch {
        return null
      }
    }
  }
})
