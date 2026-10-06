import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginAPI, updateAPI } from "../api/auth.js";
import "../styles/user.css";

// The user login component
export function Login({ setUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Login the user
  async function loginUser(event) {
    event.preventDefault();
    setError(null);

    try {
      // Take the data and send it to the API, get the token and user back
      const formData = new FormData(event.currentTarget);
      const { token, user } = await loginAPI(formData);

      // Set the token in local storage and the user in the state
      localStorage.setItem("token", token);
      setUser(user);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="userView">
      <h2 className="userHeader">Login</h2>
      {error && <div className="formError">{error}</div>}
      <form className="userForm" onSubmit={loginUser}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email@example.com"
          maxLength={255}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          minLength={12}
          maxLength={72}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

// The profile component
export function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  if (!user) {
    return navigate("/login");
  }

  // Update the user data
  async function updateUser(event) {
    event.preventDefault();
    setError(null);

    try {
      // Take the data and send it to the API, get the user back
      const formData = new FormData(event.currentTarget);
      const { user } = await updateAPI(formData);

      // Set the user in the state
      setUser(user);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="userView">
      <h2 className="userHeader">Profile</h2>
      {error && <div className="formError">{error}</div>}
      <form className="userForm" onSubmit={updateUser}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder={user.email}
          maxLength={255}
        />
        <label htmlFor="username">Username (3 - 32 characters)</label>
        <input
          id="username"
          name="username"
          type="text"
          minLength={3}
          maxLength={32}
          placeholder={user.username}
        />
        <label htmlFor="password">New Password (12 - 72 characters)</label>
        <input
          id="password"
          name="password"
          type="password"
          minLength={12}
          maxLength={72}
        />
        <label htmlFor="confirmation">Confirmation</label>
        <input
          id="confirmation"
          name="confirmation"
          type="password"
          minLength={12}
          maxLength={72}
        />
        <label htmlFor="currentPassword">Current Password (required)</label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          minLength={12}
          maxLength={72}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
