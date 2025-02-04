import { defineStore } from "pinia";
const DEFAULT_TIMEOUT = 2_000;

export const useAlertStore = defineStore('alert', () => {
    const alertData = ref({
        visible: false,
        type: "info",
        message: "",
        timeout: DEFAULT_TIMEOUT,
    });

    const showAlert = (message: string, type = "info", timeout = DEFAULT_TIMEOUT) => {
        alertData.value = {
            visible: true,
            type,
            message,
            timeout
        };
    };

    const hideAlert = () => {
        alertData.value = {
            visible: false,
            message: "",
            timeout: -1,
            type: "info"
        };
    };

    return {
        alertData,
        showAlert,
        hideAlert
    };
});