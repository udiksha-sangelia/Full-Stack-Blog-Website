import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import axios from "axios"; // Import axios
import "../styles/register.css";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // Track errors
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateInputs = () => {
    const { name, email, password } = formData;

    // Name validation (only letters and spaces allowed)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name) || name.length < 3) {
      setError("❌ Name must contain only letters and be at least 3 characters long.");
      return false;
    }

    // Email validation (standard format check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("❌ Invalid email format.");
      return false;
    }

    // Password validation (min 6 characters, 1 letter, 1 number)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("❌ Password must be at least 6 characters long and contain at least one special character and one number.");
      return false;
    }

    setError(""); // Clear error if validation passes
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateInputs()) return; // Stop if validation fails
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("✅ User Registered Successfully:", response.data);
      navigate("/login"); // Redirect to Login after successful registration

    } catch (error) {
      console.error("❌ Registration Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
  <div className="register-box">
    <h2 className="register-title">Register</h2>
    
    {error && <p className="error-message">{error}</p>}
    
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="register-input" required />
      <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="register-input" required />
       <div className="register-password-container">
        <input type={showPassword ? "text" : "password"}  name="password" placeholder="Password" onChange={handleChange} className="password-container-input" required />
          <span onClick={togglePasswordVisibility} className="toggle-register-password">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      <button type="submit" className="register-btn">Sign Up
        {loading ? "Loading..." : "Login"}
      </button>
    </form>

    <p className="login-link">
      Already have an account? <Link to="/login">Login</Link>
    </p>
  </div>
</div>

  );
};

export default Register;
