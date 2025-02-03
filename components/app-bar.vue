<template>
    <v-app-bar class="w-100 px-4 d-flex justify-space-between align-center bg-primary">
        <h1 class="text-h5 text-white">SageX Assignment</h1>
        <div class="ml-auto">
            <v-dialog v-model="addProductDialog" width="900">
                <template #activator="{ props: activatorProps }">
                    <v-btn v-bind="activatorProps" append-icon="mdi-pen-plus" class="rounded-pill bg-white">
                        Add
                    </v-btn>
                </template>

                <template #default="">
                    <AddProduct @close-add-dialog="addProductDialog = false"/>
                </template>
            </v-dialog>
        </div>
    </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';  // Import ref from vue

// Use ref instead of shallowRef for boolean values
const addProductDialog = ref(false);  // Dialog visibility state

// Other logic
const {
    data,
    pending,
    error,
    refresh
} = useServerFetch('https://jsonplaceholder.typicode.com/todos')
</script>
