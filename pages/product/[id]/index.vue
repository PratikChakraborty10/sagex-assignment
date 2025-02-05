<template>
    <Head>
        <Title>{{ data?.data?.name }}</Title>
        <Meta name="description"
            :content="`Get the best deals on ${data?.data?.name}. Price: ${data?.data?.price}. Available now!`" />
        <Meta property="og:title" :content="`${data?.data?.name}`" />
        <Meta property="og:description"
            :content="`Get the best deals on ${data?.data?.name}. Price: ${data?.data?.price}. Available now!`" />
    </Head>

    <AppProduct v-if="!pending" :data="data?.data" />
    <div v-else class="h-100 w-100 d-flex justify-center align-center ga-4">
        <v-icon icon="mdi-loading" size="180"></v-icon>
        <p>Loading...</p>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/types';
import { API_URL } from '~/utils/config';


// Extract route parameter id and define the fetch data structure
const { id } = useRoute().params as { id: string };

// Use server fetch with proper typing
const { data, pending, error } = useServerFetch<{ data: Product } | null>(`${API_URL}/get-product/${id}`);

definePageMeta({
    layout: "main-layout"
})
</script>