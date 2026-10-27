const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    // origin: "http://localhost:5174",
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});