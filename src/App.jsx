import { useEffect, useState } from "react";
import { Navigate, Outlet, Routes, Route } from "react-router-dom";

import Content from "./components/content/Content.jsx";
import Header from "./components/Header.jsx";
import { Login, Profile } from "./components/User.jsx";
import { getCurrentUser } from "./api/auth.js";
import "./styles/index.css";

// The APP
function App() {
  // Set the theme for the site
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");

  // Set the user to null first
  const [user, setUser] = useState(null);
  // Set the state to make sure we know if we are already checking for auth
  const [authChecking, setAuthChecking] = useState(true);

  // Check for the token, if no token, no need to check further
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthChecking(false);
      return;
    }

    // If a token was present, contact the API to check the user
    getCurrentUser()
      .then((user) => setUser(user))
      .catch((error) => {
        if (error.status === 401 || error.status === 403) {
          // If the token was rejected, remove it and log out the user
          localStorage.removeItem("token");
          setUser(null);
          return;
        }

        console.error("Failed to restore user:", error);
      })
      .finally(() => {
        setAuthChecking(false);
      });
  }, []);

  // The theme toggle function will flip on the document so set it up here
  const themeToggle = (theme) => {
    // Toggle the theme between light and dark
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.dataset.theme = newTheme;
    setTheme(newTheme);
  };

  // The protected route. If there is no user, navigate to login
  function ProtectedRoute({ user, authChecking }) {
    if (authChecking) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return <Outlet />;
  }

  return (
    <>
      <Header theme={theme} themeToggle={themeToggle} />

      <main className="responsivePadding">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />

          <Route
            element={<ProtectedRoute user={user} authChecking={authChecking} />}
          >
            <Route path="/" element={<Content user={user} />} />
            <Route path="/posts/new" element={<Content user={user} />} />
            <Route path="/posts/:postId" element={<Content user={user} />} />
            <Route
              path="/category/:category"
              element={<Content user={user} />}
            />
            <Route
              path="/profile"
              element={<Profile user={user} setUser={setUser} />}
            />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
