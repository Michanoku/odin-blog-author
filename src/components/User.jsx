import { loginAPI, updateAPI } from "../api/auth.js";
import "../styles/user.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login({ setUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function loginUser(event) {
    event.preventDefault();
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const { token, user } = await loginAPI(formData);

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

export function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  if (!user) {
    return navigate("/login");
  }

  async function updateUser(event) {
    event.preventDefault();
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const { user } = await updateAPI(formData);

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