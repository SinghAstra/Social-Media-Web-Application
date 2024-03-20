const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    console.log("Connected to the Database Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Social API is available" });
});

app.listen(5000, () => {
  console.log("Server is Listening on Port 5000");
});
