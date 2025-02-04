<template>
  <div class="h-100 w-100 d-flex flex-column justify-start items-center">
    <div class="w-100 pa-2 d-flex justify-end">
      <v-btn prepend-icon="mdi-reload" class="rounded-pill bg-primary" @click="refetchProductList">Refetch</v-btn>
    </div>

    <v-data-table-virtual v-if="products.length" :headers="headers" :items="products" item-value="name"
      class="cursor-pointer" @click:row="goToProduct">
      <!-- Actions Column Slot -->
      <template v-slot:item.actions="{ item }">
        <v-btn icon="mdi-pencil" variant="text" @click.stop="editProduct(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon="mdi-delete" variant="text" color="red" @click.stop="deleteProduct(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table-virtual>

    <div v-else-if="loading" class="h-100 w-100 d-flex justify-center align-center ga-4">
      <v-icon icon="mdi-loading" size="180"></v-icon>
      <p>Loading...</p>
    </div>
    <div v-else-if="error" class="d-flex flex-column align-center justify-center text-center">
      <v-icon size="100" color="red">mdi-lightbulb-alert</v-icon>
      <p class="text-h6 mt-4">Error: 404 | Products could not be found</p>
    </div>

    <!-- Edit Product Dialog -->
    <v-dialog v-model="editProductDialog" width="900">
      <template #default>
        <EditProduct v-if="selectedProduct" :product="selectedProduct" @product-updated="refetchProductList"
          @close-edit-dialog="editProductDialog = false" />
      </template>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store/useProductStore';
import { deleteProductApi } from '~/utils/api';
import { API_URL } from '~/utils/config';

const productStore = useProductStore(); 

const router = useRouter();
const { data, loading, error, refetch } = useFetch(`${API_URL}/get-products`);

const editProductDialog = ref(false); // Dialog visibility state
const selectedProduct = ref(null);

const headers = [
  { title: "Product Name", align: "start", key: "name" },
  { title: "Quantity", align: "end", key: "quantity" },
  { title: "Price", align: "end", key: "price" },
  { title: "Total Amount", align: "end", key: "total_amount" },
  { title: "Created At", align: "end", key: "created_at" },
  { title: "Updated At", align: "end", key: "updated_at" },
  { title: "Actions", align: "center", key: "actions", sortable: false },
];

const products = computed(() => {
  return data.value?.data || [];
});

// Navigate to product page
const goToProduct = (event: any, { item }: { item: any }) => {
  router.push(`/product/${item.id}`);
};

// Method to edit the product
const editProduct = (product: any) => {
  console.log("Editing product:", product);
  selectedProduct.value = product;
  editProductDialog.value = true;
};

// Method to delete the product using helper function
const deleteProduct = async (product: any) => {
  console.log("Deleting product:", product);

  try {
    const response = await deleteProductApi(product.id);

    if (response.status === 'success') {
      refetch();
      console.log("Product deleted successfully.");
    } else {
      console.error("Failed to delete product:", response.message || 'Unknown error');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

// Method to refetch the product list
const refetchProductList = () => {
  refetch();
}

// Watch the `isProductAdded` state and refetch products when it's true
watch(
  () => productStore.isProductAdded,
  (newVal) => {
    if (newVal) {
      refetch();
      productStore.resetState();
    }
  }
);
</script>
