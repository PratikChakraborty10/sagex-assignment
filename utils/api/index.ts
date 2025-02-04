import { $fetch } from "ohmyfetch";
import { API_URL } from "../config";
import type { Product } from "~/types/types";

export async function addProductApi(product: Product) {
  try {
    const data = await $fetch(`${API_URL}/add-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: product,
    });

    return data;
  } catch (err) {
    console.error("Error adding product:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unexpected error occurred"
    );
  }
}

export async function editProductApi(
  productId: string,
  updatedProduct: Product
) {
  try {
    const data = await $fetch(`${API_URL}/update-product/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: updatedProduct,
    });

    return data;
  } catch (err) {
    console.error("Error updating product:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unexpected error occurred"
    );
  }
}

export async function deleteProductApi(productId:string) {
  try {
    const response = await $fetch(`${API_URL}/delete-product/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response?.status !== "success") {
      throw new Error(response.message || "Failed to delete product");
    }

    return response;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
}
