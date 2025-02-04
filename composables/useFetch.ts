import { ref, onMounted } from "vue";

export function useFetch<T>(url: string, options: RequestInit = {}) {
    const data = ref<T | null>(null);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(false);
    
    async function fetchData(forceRefresh = false) {
        const cache = useState<Record<string, T>>("fetch-cache", () => ({}));

        try {
            loading.value = true;
            error.value = null;

            if (!forceRefresh && cache.value[url]) {
                // Use cached data only if forceRefresh is false
                data.value = cache.value[url];
            } else {
                const response = await $fetch(url, options);
                data.value = response;
                cache.value[url] = response;
            }
        } catch (err: any) {
            error.value = err.message || "Something went wrong";
        } finally {
            loading.value = false;
        }
    }

    onMounted(() => fetchData(false)); // Initial fetch, uses cache if available

    return {
        data,
        loading,
        error,
        refetch: () => fetchData(true), // Force API refetch on button click
    };
}
