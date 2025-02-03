<template>
    <v-card class="h-100 w-100 d-flex flex-column">
      <div class="pa-4 w-100 d-flex justify-space-between align-center">
        <p>Add Product</p>
        <v-btn size="small" flat icon="mdi-close" @click="closeAddProductDialog"></v-btn>
      </div>
      <v-divider></v-divider>
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
          v-model="product.price"
          variant="outlined"
          label="Price"
          :rules="[rules.required, rules.price]"
          required
          dense
          type="number"
        ></v-text-field>
  
        <v-text-field
          v-model="product.quantity"
          variant="outlined"
          label="Quantity"
          :rules="[rules.required, rules.quantity]"
          required
          dense
          type="number"
        ></v-text-field>
  
        <v-text-field
          v-model="product.total_amount"
          variant="outlined"
          label="Total Amount"
          :rules="[rules.required, rules.totalAmount]"
          required
          dense
          readonly
        ></v-text-field>
  
        <v-btn
          color="primary"
          @click="addProduct"
          :disabled="!valid"
          block
        >
          Add Product
        </v-btn>
        </div>
      </v-form>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  const emit = defineEmits(['close-add-dialog']);
  
  // Form validation state
  const valid = ref(false);
  const product = ref({
    name: '',
    price: 0,
    quantity: 0,
    total_amount: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  
  // Form validation rules
  const rules = {
    required: (value: string) => !!value || 'This field is required',
    price: (value: number) => value > 0 || 'Price must be greater than 0',
    quantity: (value: number) => value > 0 || 'Quantity must be greater than 0',
    totalAmount: (value: number) => value >= 0 || 'Total Amount cannot be negative',
  };
  
  // Update total amount when price or quantity changes
  const updateTotalAmount = () => {
    product.value.total_amount = product.value.price * product.value.quantity;
  };
  
  // Watch price and quantity changes to update total_amount
  product.value.price = 0;
  product.value.quantity = 0;
  watch([() => product.value.price, () => product.value.quantity], updateTotalAmount);
  
  const closeAddProductDialog = () => {
    emit('close-add-dialog');
  };
  
  // Handle adding product (example logic)
  const addProduct = () => {
    if (valid) {
      console.log('Product Added:', product.value);
      // Implement product saving logic here
    }
  };
  </script>
  
  