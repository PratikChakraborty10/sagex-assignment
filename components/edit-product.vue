<template>
    <v-card class="h-100 w-100 d-flex flex-column">
      <div class="pa-4 w-100 d-flex justify-space-between align-center">
        <p class="font-weight-bold">Edit Product</p>
        <v-btn size="small" flat icon="mdi-close" @click="closeEditProductDialog"></v-btn>
      </div>
      <v-divider></v-divider>
  
      <!-- Error Alert -->
      <v-alert
        v-if="error"
        type="error"
        class="ma-4"
        closable
        @click:close="error = null"
      >
        {{ error }}
      </v-alert>
  
      <v-form v-model="valid" ref="form" class="pa-4">
        <div class="d-flex flex-column ga-2">
          <v-text-field
            v-model="product.name"
            variant="outlined"
            label="Product Name"
            :rules="[rules.required]"
            required
            dense
          ></v-text-field>
  
          <v-text-field
            v-model.number="product.price"
            variant="outlined"
            label="Price"
            :rules="[rules.required, rules.price]"
            required
            dense
            type="number"
            step="0.01"
          ></v-text-field>
  
          <v-text-field
            v-model.number="product.quantity"
            variant="outlined"
            label="Quantity"
            :rules="[rules.required, rules.quantity]"
            required
            dense
            type="number"
            step="1"
          ></v-text-field>
  
          <v-text-field
            v-model.number="product.total_amount"
            variant="outlined"
            label="Total Amount"
            :rules="[rules.required, rules.totalAmount]"
            required
            dense
            readonly
          ></v-text-field>
  
          <v-btn
            color="primary"
            @click="editProduct"
            :loading="loading"
            :disabled="!valid || loading"
            block
          >
            Edit Product
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import type { Product } from '~/types/types';
import { editProductApi } from '~/utils/api';
  
  const emit = defineEmits<{
    'close-edit-dialog': [],
    'product-updated': [product: Product]
  }>();
  
  const valid = ref(false);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const form = ref<any>(null);
  
  // Initialize product object as a prop
  const props = defineProps<{
    product: Product
  }>();
  
  const product = ref<Product>({
    ...props.product
  });
  
  const rules = {
    required: (value: any) => !!value || 'This field is required',
    price: (value: number) => value > 0 || 'Price must be greater than 0',
    quantity: (value: number) => value > 0 || 'Quantity must be greater than 0',
    totalAmount: (value: number) => value >= 0 || 'Total Amount cannot be negative',
  };
  
  const updateTotalAmount = () => {
    product.value.total_amount = Number((product.value.price * product.value.quantity).toFixed(2));
  };
  
  watch(
    [() => product.value.price, () => product.value.quantity],
    () => {
      if (product.value.price && product.value.quantity) {
        updateTotalAmount();
      }
    }
  );
  
  const closeEditProductDialog = () => {
    emit('close-edit-dialog');
  };

  // Method to call when edit button is hit
  const editProduct = async () => {
  error.value = null;
  
  if (!valid.value) {
    error.value = 'Please fill all required fields correctly';
    return;
  }
  
  try {
    loading.value = true;
    const data = await editProductApi(product.value.id, product.value);

    if (data.status === 'success') {
      emit('product-updated', data.data);
      closeEditProductDialog();
    } else {
      throw new Error(data.message || 'Failed to update product');
    }
  } catch (err) {
    console.error('Error updating product:', err);
    error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
  } finally {
    loading.value = false;
  }
};
  
  // Prefill data when product prop is changed
  onMounted(() => {
    product.value = { ...props.product };
  });
  </script>
  