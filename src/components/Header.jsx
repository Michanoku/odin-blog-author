import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  House,
  LayoutDashboard,
  LogOut,
  Moon,
  Sun,
  User,
  UserPen,
} from "lucide-react";

import urls from "../api/urls.js";
import "../styles/header.css";

// The user menu dropdown component
function Dropdown() {
  // Used for opening and closing the dropdown
  const [open, setOpen] = useState(false);

  // If the user wants to logout, simply remove the token and navigate to frontend
  function logoutUser(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    setOpen(false);
    window.location = urls.frontend;
  }

  // IF the user clicks outside the dropdown, close it
  useEffect(() => {
    function handleClick(event) {
      // Close dropdown if clicked outside
      if (!event.target.closest(".dropdown")) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    // Remove event listener when component is removed
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  // When the dropdown is toggled, open it or close it
  function toggleDropdown() {
    setOpen(!open);
  }

  return (
    <div className="dropdown">
      <button className="icon author" onClick={toggleDropdown}>
        <User />
      </button>
      <div className={open ? "dropdownMenu open" : "dropdownMenu"}>
        <Link className="icon" to="/profile" onClick={() => setOpen(false)}>
          <UserPen /> Profile
        </Link>
        <button className="icon" onClick={logoutUser}>
          <LogOut /> Logout
        </button>
      </div>
    </div>
  );
}

// The theme toggle component
function ThemeToggle({ theme, themeToggle }) {
  // Set the icon to the current theme
  const icon = theme === "light" ? <Sun /> : <Moon />;
  return (
    <button className="icon author" onClick={() => themeToggle(theme)}>
      {icon}
    </button>
  );
}

// The header function
export default function Header({ theme, themeToggle }) {
  return (
    <header className="responsivePadding">
      <nav>
        <h1 className="siteTitle">Michanoku AUTHOR</h1>
        <div className="icons">
          <a className="icon author" href={urls.frontend}>
            <House />
          </a>

          <Link className="icon author" to="/">
            <LayoutDashboard />
          </Link>
          <Dropdown />
          <ThemeToggle theme={theme} themeToggle={themeToggle} />
        </div>
      </nav>
    </header>
  );
}
