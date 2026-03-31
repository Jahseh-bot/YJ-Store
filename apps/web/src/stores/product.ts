import { defineStore } from 'pinia'
import type { Product } from '~/types/product'

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
        const config = useRuntimeConfig()
        const data = await $fetch<Product[]>(`${config.public.apiBase}/products`)
        this.products = data
      } catch (e) {
        this.error = 'Failed to fetch products'
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    async getProductById(id: number): Promise<Product | null> {
      try {
        const config = useRuntimeConfig()
        return await $fetch<Product>(`${config.public.apiBase}/products/${id}`)
      } catch {
        return null
      }
    }
  },

  getters: {
    getProductById: (state) => (id: number) => {
      return state.products.find(p => p.id === id)
    }
  }
})
