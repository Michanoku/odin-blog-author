import { useState, useEffect } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import { Login, Profile } from "./components/User.jsx";
import Content from "./components/content/Content.jsx";
import { getCurrentUser } from "./api/auth.js";
import "./styles/index.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");

  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthChecking(false);
      return;
    }

    getCurrentUser()
      .then((user) => setUser(user))
      .catch((error) => {
        if (error.status === 401 || error.status === 403) {
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

  const themeToggle = (theme) => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.dataset.theme = newTheme;
    setTheme(newTheme);
  };

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
