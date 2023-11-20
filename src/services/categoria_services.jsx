import { URLAPIGENERAL } from "../config/config";

export async function getCategoriesApi() {
  const url = `${URLAPIGENERAL}/api/categories/`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

export async function addCategoryApi(data, token) {
  console.log(data);
  const formData = new FormData();
  formData.append("image", data.image);
  formData.append("title", data.title);

  const url = `${URLAPIGENERAL}/api/categories/`;
  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  const response = await fetch(url, params);
  const result = await response.json();
  return result;
}

export async function updateCategoryApi(id, data, token) {
  const formData = new FormData();
  formData.append("title", data.title);
  if (data.image) formData.append("image", data.image);

  const url = `${URLAPIGENERAL}/api/categories/${id}/`;
  const params = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  const response = await fetch(url, params);
  const result = await response.json();
  return result;
}

export async function deleteCategoryApi(id, token) {
  const url = `${URLAPIGENERAL}/api/categories/${id}/`;
  const params = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, params);
  const result = await response.json();
  return result;
}
