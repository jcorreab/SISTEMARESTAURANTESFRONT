/* eslint-disable no-useless-catch */
import { URLAPIGENERAL } from "../config/config";

export async function getProductsApi() {
  try {
    const url = `${URLAPIGENERAL}/api/products/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addProductApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("active", data.active);
    formData.append("image", data.image);

    const url = `${URLAPIGENERAL}/api/products/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, params);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateProductApi(id, data, token) {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("active", data.active);
    if (data.image) formData.append("image", data.image);

    const url = `${URLAPIGENERAL}/api/products/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, params);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteProductApi(id, token) {
  try {
    const url = `${URLAPIGENERAL}/api/products/${id}/`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

export async function getProductByIdApi(id) {
  try {
    const url = `${URLAPIGENERAL}/api/products/${id}/`;
    const response = await fetch(url);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getProductsByCategoryApi(idCategory) {
  try {
    const categoryFilter = `category=${idCategory}`;
    const url = `${URLAPIGENERAL}/api/products/?${categoryFilter}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
