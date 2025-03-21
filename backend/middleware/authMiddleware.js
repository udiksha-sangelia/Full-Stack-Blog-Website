const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async(req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1]; // Extract token
    
        if (!token) {
          return res.status(401).json({ message: "No token provided" });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id).select("-password"); // Fetch user from DB
    
        if (!req.user) {
          return res.status(401).json({ message: "User not found" });
        }
    
        next(); // Proceed to the next middleware
      } catch (error) {
        console.error("Authentication Error:", error);
        res.status(401).json({ message: "Invalid token" });
      }
};

