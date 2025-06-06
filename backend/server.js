const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: ["https://full-stack-blog-website-34xo.vercel.app"] , methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log("🔹 Received request:", req.method, req.url);
    console.log("🔹 Request Body:", req.body);
    next();
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
