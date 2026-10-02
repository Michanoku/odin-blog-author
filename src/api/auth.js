import { contactAPI } from "./api.js";

// The login event sending the data to the api.
export async function loginAPI(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const path = "author/login";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  return contactAPI(path, options);
}

// The update event sending the data to the api.
export async function updateAPI(formData) {
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmation = formData.get("confirmation");
  const currentPassword = formData.get("currentPassword");

  const path = "user/profile";
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      email,
      username,
      password,
      confirmation,
      currentPassword,
    }),
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
