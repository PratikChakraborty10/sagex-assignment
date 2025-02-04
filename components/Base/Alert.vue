<template>
    <v-snackbar 
        v-model="alertData.visible" :content-class="[styles.default, styles.type?.[alertData?.type]]"
        :timeout="alertData.timeout">
        <p class="text-subtitle-1 text-white">{{ alertData.message }}</p>

        <template #actions>
            <v-btn variant="text" @click="hideAlert">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>
<script setup>
import { useAlertStore } from '~/store/useAlertStore';

const AletStore = useAlertStore();
const { hideAlert } = AletStore;
const { alertData } = storeToRefs(AletStore);

const styles = {
    type: {
        error: "bg-error",
        success: "bg-success",
        info: "bg-info",
        warn: "bg-warning",
    },
    default: ""
}
</script>