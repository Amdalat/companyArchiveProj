const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(cors({
    // origin: "http://localhost:5174",
    origin: [
      'https://companyarchiveamdui.onrender.com',
      "http://localhost:5176"
    ],
    credentials: true
}));

const port = process.env.PORT || 5000;

const authrouter = require("./routes/authroutes");
app.use("/api/auth/", authrouter)

const userrouter = require("./routes/userroutes");
app.use("/api/users/", userrouter)

const companyrouter = require("./routes/companyroutes");
app.use("/api/companies/", companyrouter)

app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log("Connected to MongoDB")})
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

  // Serve the React frontend
const frontendPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(frontendPath));

// Return React for frontend routes
app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api/")) {
        return next();
    }

    res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});