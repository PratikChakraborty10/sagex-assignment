import { useAlertStore } from "@/store/useAlertStore";

export default function useAlert() {
  const { showAlert } = useAlertStore();

  // internally call store method with error
  const error = (message: string, timeout?: number) => {
    showAlert(message, "error", timeout);
  };

  // internally call store method with info
  const info = (message: string, timeout?: number) => {
    showAlert(message, "info", timeout);
  };

  // internally call store method with success
  const success = (message: string, timeout?: number) => {
    showAlert(message, "success", timeout);
  };

  // internally call store method with warn
  const warn = (message: string, timeout?: number) => {
    showAlert(message, "warn", timeout);
  };

  return {
    error,
    info,
    success,
    warn,
  };
}