import { URLAPIGENERAL } from "../config/config";

export async function loginApi(formValue) {
  try {
    const url = `${URLAPIGENERAL}/api/auth/login/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    };

    const response = await fetch(url, params);

    if (response.status !== 200) {
      throw new Error("Usuario o contraseña incorrectos");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getMeApi(token) {
  const url = `${URLAPIGENERAL}/api/auth/me/`;
  const params = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, params);
  const result = await response.json();
  return result;
}

export async function getUsersApi(token) {
  const url = `${URLAPIGENERAL}/api/users/`;
  const params = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, params);
  const result = await response.json();
  return result;
}

export async function addUserApi(data, token) {
  const url = `${URLAPIGENERAL}/api/users/`;
  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, params);
  const result = await response.json();
  return result;
}

export async function updateUserApi(id, data, token) {
  const url = `${URLAPIGENERAL}/api/users/${id}/`;
  const params = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, params);
  const result = await response.json();
  return result;
}

export async function deleteUserApi(id, token) {
  const url = `${URLAPIGENERAL}/api/users/${id}/`;
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
