export function useApi<T = unknown>(
  endpoint: string,
  options?: RequestInit & { params?: Record<string, string | number> }
) {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase as string

  let url = `${baseUrl}${endpoint}`
  if (options?.params) {
    const searchParams = new URLSearchParams()
    Object.entries(options.params).forEach(([key, value]) => {
      searchParams.append(key, String(value))
    })
    url += `?${searchParams.toString()}`
  }

  const { data, pending, error, refresh } = useFetch<T>(url, {
    ...options,
    key: endpoint
  })

  return {
    data,
    pending,
    error,
    refresh
  }
}
