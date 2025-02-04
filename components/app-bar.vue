<template>
    <v-app-bar class="w-100 px-4 d-flex justify-space-between align-center bg-primary position-fixed">
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
const addProductDialog = ref(false);  // Dialog visibility state initially
</script>
