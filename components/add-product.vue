<template>
  <v-card class="h-100 w-100 d-flex flex-column">
    <div class="pa-4 w-100 d-flex justify-space-between align-center">
      <p class="font-weight-bold">Add Product</p>
      <v-btn size="small" flat icon="mdi-close" @click="closeAddProductDialog"></v-btn>
    </div>
    <v-divider></v-divider>

    <!-- Error Alert -->
    <v-alert v-if="error" type="error" class="ma-4" closable @click:close="error = null">
      {{ error }}
    </v-alert>

    <v-form v-model="valid" ref="form" class="pa-4">
      <div class="d-flex flex-column ga-2">
        <v-text-field v-model="product.name" variant="outlined" label="Product Name" :rules="[rules.required]" required
          dense></v-text-field>

        <v-text-field v-model.number="product.price" variant="outlined" label="Price"
          :rules="[rules.required, rules.price]" required dense type="number" step="0.01"></v-text-field>

        <v-text-field v-model.number="product.quantity" variant="outlined" label="Quantity"
          :rules="[rules.required, rules.quantity]" required dense type="number" step="1"></v-text-field>

        <v-text-field v-model.number="product.total_amount" variant="outlined" label="Total Amount"
          :rules="[rules.required, rules.totalAmount]" required dense readonly></v-text-field>

        <v-btn color="primary" @click="addProduct" :loading="loading" :disabled="!valid || loading" block>
          Add Product
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Product } from '~/types/types';
import { addProductApi } from '~/utils/api';
import { useProductStore } from '~/store/useProductStore';

const productStore = useProductStore(); 


const emit = defineEmits<{
  'close-add-dialog': [],
  'product-added': [product: Product]
}>();

const valid = ref(false);
const loading = ref(false);
const error = ref<string | null>(null);
const form = ref<any>(null);

const product = ref<Product>({
  name: '',
  price: 0,
  quantity: 0,
  total_amount: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  id: ''
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

const closeAddProductDialog = () => {
  emit('close-add-dialog');
};

const addProduct = async () => {
  error.value = null;

  if (!valid.value) {
    error.value = 'Please fill all required fields correctly';
    return;
  }

  try {
    loading.value = true;
    const response = await addProductApi(product.value);

    if (response.status === 'success') {
      productStore.addProduct();
      emit('product-added', response.data);
      closeAddProductDialog();
    } else {
      throw new Error(response.message || 'Failed to add product');
    }
  } catch (err) {
    console.error('Error adding product:', err);
    error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
  } finally {
    loading.value = false;
  }
};
</script>
