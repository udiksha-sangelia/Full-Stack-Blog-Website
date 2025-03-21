import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import "../styles/Login.css";

const Login = ({setIsAuthenticated}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateInputs = () => {
    const { email, password } = formData;

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("❌ Invalid email format.");
      return false;
    }

    // Password Validation (Min 6 chars, 1 letter, 1 number)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("❌ Password must be at least 6 characters long and contain at least one letter and one number.");
      return false;
    }

    setError(""); // Clear error if validation passes
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return; // Stop if validation fails

    try {
        const response = await axios.post("http://localhost:5000/api/auth/login", formData, {
            headers: { "Content-Type": "application/json" },
        });

        console.log("✅ API Response:", response.data);

        if (response.data.token) {
            console.log("✅ Token Received:", response.data.token);

            // Store token in localStorage
            localStorage.setItem("token", response.data.token);

            localStorage.setItem("currentUser", JSON.stringify(response.data.user));

            // Update authentication state
            setIsAuthenticated(true);

            // Redirect to dashboard
            navigate("/");
        } else {
            setError("Login failed: No token received.");
        }
    } catch (error) {
        console.error("❌ Login Error:", error.response?.data || error.message);
        
        if (error.response?.status === 401) {
          alert("Wrong password! Please try again.");
        } else {
          alert(error.response?.data?.message || "Login failed. Please try again.");
        }
    }
};


  return (
    <div className="login-container">
  <div className="login-box">
    <h2 className="login-title">Login</h2>

    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} className="login-input" required />
      <div className="password-container">
      <input type={showPassword ? "text" : "password"}  name="password" placeholder="Password" onChange={handleChange}  required />
      <span onClick={togglePasswordVisibility} className="toggle-password">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
      </div>
      <button type="submit" className="login-btn">Login</button>
    </form>

    <p className="register-link">
      Don't have an account? <a href="/register">Register</a>
    </p>
  </div>
</div>

  );
};

export default Login;
