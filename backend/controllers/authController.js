const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    console.log("🔹 Registering User:", req.body);
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email: email.trim().toLowerCase() });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      name,
      email: email.trim().toLowerCase(),
      password: hashedPassword, // ✅ Store hashed password
    });

    console.log("✅ User Registered:", newUser.email);
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("❌ Registration Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    console.log("🔹 Login Attempt:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Wrong Password Attempt for:", email);
      return res.status(401).json({ message: "Wrong password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { _id: user._id, email: user.email }, 
      process.env.JWT_SECRET || "default_secret", // ✅ Use fallback secret for safety
      { expiresIn: "24h" }
    );

    console.log("✅ Login Success:", user.email);
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("❌ Login Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
