import { defineStore } from 'pinia'
import type { User } from '@/types/user'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api'

interface UserState {
  user: User | null
  token: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    token: null
  }),

  actions: {
    async login(username: string, password: string) {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      this.user = data.user
      this.token = data.token
      return data
    },

    logout() {
      this.user = null
      this.token = null
    }
  }
})
