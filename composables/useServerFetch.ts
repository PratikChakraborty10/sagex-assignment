import type { AsyncDataOptions } from 'nuxt/app'

export function useServerFetch<T>(url: string, options: AsyncDataOptions<T> = {}) {
  return useAsyncData<T>(
    // Generate a unique key based on the URL
    url,
    // Fetch function
    async () => {
      try {
        // Using $fetch for async data retrieval
        return await $fetch<T>(url, {
          // Merge any additional fetch options
          ...options.fetchOptions
        })
      } catch (error) {
        // Handle and potentially transform error
        throw error
      }
    },
    // Allow passing additional useAsyncData options
    {
      // Spread any additional useAsyncData options
      ...options,
      // Default to using lazy loading
      lazy: options.lazy ?? true
    }
  )
}
