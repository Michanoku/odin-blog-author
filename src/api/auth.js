import { contactAPI } from "./api.js";

// The login event sending the data to the api.
export async function loginAPI(formData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const path = "author/login";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return contactAPI(path, options);
}

// The update event sending the data to the api.
export async function updateAPI(formData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmation: formData.get("confirmation"),
    currentPassword: formData.get("currentPassword"),
  };

  const path = "user/profile";
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  };

  return contactAPI(path, options);
}

// Getting the current user from the JWT
export async function getCurrentUser() {
  const path = "author/me";

  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return contactAPI(path, options);
}
