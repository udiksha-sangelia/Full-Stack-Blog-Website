import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import "../styles/NavBar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Convert stored string to object
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token");  // Remove token on logout
    localStorage.removeItem("currentUser");   // Remove user info
    window.location.reload();
    setUser(null);
    navigate("/login");                 // Redirect to login page
  };

  return (
    <nav className="navbar">
      <h2 className="logo">MyBlog</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blogs">Blogs</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      
      {/* Show Logout Button only if user is logged in */}
      {/* <div className="user-section"> */}
        {user ? (
          <>
            <span className="welcome-text">Welcome, {user.name}!</span>
            <button onClick={handleLogout} >Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>)
          }
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
