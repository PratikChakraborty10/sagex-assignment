import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductStore = defineStore('product', () => {
  const isProductAdded = ref(false); 
  const counter = ref(0); 

  // Method to increment the counter and set isProductAdded to true
  const addProduct = () => {
    counter.value++;
    isProductAdded.value = true;
  };

  // Method to reset the state (if needed)
  const resetState = () => {
    isProductAdded.value = false;
  };

  return { isProductAdded, counter, addProduct, resetState };
});
