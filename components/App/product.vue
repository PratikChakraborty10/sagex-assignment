<template>
    <div class="w-100 d-flex justify-center pa-12">
      <v-card v-if="product" class="mx-auto pa-6 h-auto rounded-lg" max-width="400" elevation="6">
        <v-card-title class="text-h5 font-weight-bold">
          {{ product.name }}
        </v-card-title>
        <v-card-text>
        <strong>Price:</strong> {{ product.price }}
          <p><strong>Quantity:</strong> {{ product.quantity }}</p>
          <p><strong>Total Amount:</strong> {{ product.total_amount }}</p>
          <p><strong>Created At:</strong> {{ formattedDate(product.created_at) }}</p>
          <p><strong>Updated At:</strong> {{ formattedDate(product.updated_at) }}</p>
        </v-card-text>
      </v-card>
      <div v-else class="d-flex flex-column align-center justify-center text-center">
        <v-icon size="100" color="red">mdi-lightbulb-alert</v-icon>
        <p class="text-h6 mt-4">Error: 404 | Requested product could not be found</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Product } from "~/types/types";
  import { formattedDate } from "~/utils";
  
  const props = defineProps<{ data?: Product }>();
  const product = computed(() => props.data);
  </script>
  